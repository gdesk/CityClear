<template>
  <!--
    v-responsive takes a set of objects
    where the keys are class names and the values are
    functions that take an element and return a boolean.
    If the functions return true, then the classes will be applied.

    In this case, if the component is less than 800 pixels wide,
    the `small` class will be applied.
    If the component is less than 400 pixels wide, both the `small`
    and `tiny` classes will be applied.
  -->
  <div class="responsive-component" v-responsive="{
    tiny: el => el.width < 400,
    small: el => el.width < 800
  }">
  </div>
</template>

<script>
import { ResponsiveDirective } from "vue-responsive-components"

export default {
  directives: {
    responsive: ResponsiveDirective
  }
}
</script>

<style scoped>
.responsive-component {
  
}

/* Applied when the component is less than 800px wide. */
.responsive-component.small {
}

/* Applied when the component is less than 400px wide. */
.responsive-component.tiny {
  
}
</style>