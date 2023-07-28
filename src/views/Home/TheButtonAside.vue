<template>
  <ul class="d-block .d-lg-none d-md-none d-sm-none">
    <li class="menu-btn" @click="handleClick()">
      <a href="javascript:void(0)"><i class="lni lni-funnel"></i></a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  methods: {
    toggleClass(targetElement: Element, addedClass: string) {
      if (targetElement.classList.contains(addedClass)) {
        targetElement.classList.remove(addedClass);
      } else {
        targetElement.classList.add(addedClass);
      }
    },

    handleClick() {
      const targetElement = document.querySelector(".aside__menu") as Element;
      const addedClass = "menu--open";
      this.toggleClass(targetElement, addedClass);
    },
  },
});
</script>
