<template>
  <div class="user-info">
    <div class="form-main">
      <div class="form">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <input type="text" :placeholder="$t('Your name')" :value="user.name" disabled />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <input type="email" :placeholder="$t('Your email')" :value="me?.email" disabled />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <input type="tel" :placeholder="$t('Your phone number')" :value="user.tel" disabled />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group button">
              <button class="btn" disabled>{{ $t("Update") }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { users } from "@/services/auth";
import type User from "@/types/User";

export default defineComponent({
  computed: {
    me() {
      return useAuthStore().me;
    },
  },
  data() {
    return {
      user: {} as User,
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      users.all({ "filter[own]": 1 }).then(({ data }) => {
        this.user = data.data[0];
      });
    },
  },
});
</script>
