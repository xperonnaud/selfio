<template>

  <v-autocomplete
      label="Brand"
      :items="brandsList"
      v-model="brandValue"
      :color="currentColor"
      filled
      dense
      clearable
      @click:clear="brandValue = null"
      hide-details="auto"
      item-text="title"
      item-value="id"
  >
    <template v-slot:selection="data">
      <div
          color="transparent"
          v-bind="data.attrs"
          :input-value="data.selected"
          @click="data.select"
          style="height:36px !important;"
          class="py-2"
      >
        {{ data.item.title | capitalizeFilter }}
      </div>
    </template>

    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item" />
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title>
            {{ data.item.title | capitalizeFilter }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>

</template>

<script>

  export default {
    name: 'x-brand-selector',
    props: {
      value: Number,
    },
    data: () => ({
      isMounted: false,
      brandValue: null,
    }),
    methods: {
      resetValue() {
        this.brandValue = null;
      }
    },
    watch: {
      value(val) {console.log('wwwtf',val);
        if(this.isMounted)
          this.brandValue = val;
      },
      brandValue(val) {console.log('wtf',val);
        if(this.isMounted)
          this.$emit('update:value',val);
      },
    },
    mounted() {
      this.isMounted = true;
      this.brandValue = this.value;
    }
  }
</script>
