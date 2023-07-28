<template>
  <div class="wallet-detail">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-12 d-flex col-wallet-currency">
            <div>
              <i class="lni lni-wallet fs-5"></i>
              <span class="text-dark ms-3 fs-5">{{ detail.currency_id }}</span>
              <TheLoading class="ms-3 mb-1" v-if="fetching_wallet" />
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-6">
            <div class="wallet-col text-dark text-uppercase">
              {{ $t("Balance") }}
            </div>
            <TextMoney
              :amount="detail?.balance"
              :currency="detail?.currency_id"
              :color="detail?.balance < 0 ? 'danger' : 'primary'"
            />
          </div>
          <div class="col-lg-4 col-md-4 col-6">
            <div class="wallet-col text-dark text-uppercase">
              {{ $t("Available payment") }}
            </div>
            <TextMoney
              :amount="detail?.amount_available_for_payment"
              :currency="detail?.currency_id"
              :color="detail?.amount_available_for_payment < 0 ? 'danger' : 'primary'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="table-transaction w-100 scroll-x scroll-tiny mt-3">
      <table class="table table-bordered table-striped table-transaction-wallet">
        <thead>
          <tr>
            <th>
              <div class="text-center">
                <TheLoading v-if="fetching_transaction" />
              </div>
            </th>
            <th scope="col" v-for="(col, index) in col_table" :key="index">
              <div class="d-flex justify-content-between">
                <span>{{ $t(`${col.name}`) }}</span>
                <SortButton
                  :sort_by="col.sort"
                  :sort_value="filters.sort"
                  @update:sort="filters.sort = $event"
                  v-if="col.sort"
                />
              </div>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>
              <ClearFilterButton @clear="clearFilter" />
            </th>
            <th>
              <DatePicker
                :show_date="true"
                @update:date_time="filters.filter_between.voucher_date = $event"
                :date_time="filters.filter_between.voucher_date"
              />
            </th>
            <th></th>
            <th></th>
            <th>
              <InputFilter
                filter_by="receipts.receiptable_id"
                :filter_value="filters.filter['receipts.receiptable_id']"
                @update:filter="filters.filter['receipts.receiptable_id'] = $event"
              />
            </th>
          </tr>
        </thead>
        <TextEmpty class="mt-3" v-if="!transactions?.length" />
        <tbody v-else>
          <tr v-for="(transaction, index) in transactions" :key="transaction.id">
            <td class="text-center">{{ (paginate.current_page - 1) * paginate.per_page + (index + 1) }}</td>
            <td>
              <TextDateTime :timestamp="transaction?.voucher_date" :dateOnly="true" />
            </td>
            <td>
              {{ getNameOfTransaction(transaction?.transaction_type) }}
            </td>
            <td>
              <TextMoney :amount="transaction?.amount" />
            </td>
            <td>
              <div v-for="reference in transaction?.references" :key="reference.id">
                {{ reference?.receiptable_id }} -
                {{ $t(`${getContentReferenceType(reference?.receiptable_type)}`) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ThePagination :paginate="paginate" @change-page="changePage" />
  </div>
</template>

<script lang="ts">
import TextDateTime from "@/components/TextDateTime.vue";
import TextMoney from "@/components/TextMoney.vue";
import { useWalletUserStore } from "@/stores/wallet_users";
import { defineComponent } from "vue";
import TextEmpty from "@/components/TextEmpty.vue";
import TheLoading from "@/components/TheLoading.vue";
import { useTransactionStore } from "@/stores/transactions";
import { getActiveLocale } from "@/i18n/translation";
import { mapState } from "pinia";
import ThePagination from "@/components/ThePagination.vue";
import DatePicker from "@/components/DatePicker.vue";
import SortButton from "@/components/SortButton.vue";
import ClearFilterButton from "@/components/ClearFilterButton.vue";
import InputFilter from "@/components/InputFilter.vue";

export default defineComponent({
  components: {
    TextMoney,
    TextDateTime,
    TextEmpty,
    TheLoading,
    ThePagination,
    DatePicker,
    SortButton,
    ClearFilterButton,
    InputFilter,
  },

  data() {
    return {
      col_table: [
        {
          name: "Voucher date",
          sort: "voucher_date",
        },
        {
          name: "Transaction type",
          sort: "",
        },
        {
          name: "Amount",
          sort: "amount",
        },
        {
          name: "Reference",
          sort: "",
        },
      ],

      filters: {
        page: this.$route.query?.transactions_page || 1,
        filter: {
          wallet_id: this.$route.params.id,
          "receipts.receiptable_id": undefined,
        },
        filter_between: {
          voucher_date: undefined,
        },
        sort: "",
      },
      id: this.$route.params.id,
    };
  },

  computed: {
    ...mapState(useWalletUserStore, {
      detail: "detail",
      fetching_wallet: "fetching",
    }),

    ...mapState(useTransactionStore, {
      transactions: "list",
      fetching_transaction: "fetching",
      paginate: "paginate",
    }),

    language_active() {
      return getActiveLocale();
    },
  },

  watch: {
    id: {
      immediate: true,
      handler(id) {
        if (id) {
          useWalletUserStore().get(id);
          this.fetchTransactions();
        }
      },
    },

    filters: {
      deep: true,
      handler() {
        this.fetchTransactions();
      },
    },
  },

  methods: {
    fetchTransactions() {
      useTransactionStore().fetch(this.filters);
    },

    clearFilter() {
      this.$router.replace({
        query: {
          transactions_page: undefined,
        },
      });
      this.filters = {
        page: 1,
        filter: {
          wallet_id: this.id,
          "receipts.receiptable_id": undefined,
        },
        filter_between: {
          voucher_date: undefined,
        },
        sort: "",
      };
    },

    getNameOfTransaction(transaction_type: any) {
      return this.language_active ? transaction_type._name[this.language_active] : transaction_type.name;
    },

    getContentReferenceType(type: string) {
      switch (type) {
        case "purchase":
          return "Purchase order";
        case "order":
          return "Sale order";
        case "goods_delivery":
          return "Goods delivery";
        case "lading_bill":
          return "Lading bill";
        case "sfa":
          return "SFA";
        case "credit_order":
          return "Order credit";
        default:
          return type;
      }
    },

    changePage(page: number) {
      this.$router.push({
        query: {
          transactions_page: page,
        },
      });
      this.filters.page = page;
    },
  },
});
</script>
