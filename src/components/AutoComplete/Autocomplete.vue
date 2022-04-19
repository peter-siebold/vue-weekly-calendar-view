<template>
  <div ref="el" class="autocomplete">
    <input
      v-model="search"
      type="text"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul v-show="isOpen" id="autocomplete-results" class="autocomplete-results">
      <li v-if="isLoading" class="loading">Loading results...</li>
      <li
        v-for="(result, i) in results"
        v-else
        :key="i"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
        @click="setResult(result)"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, withDefaults, watch, onUnmounted, toRef } from "vue";
export interface AutocompleteProps {
  items: string[];
  isAsync?: boolean;
  selected?: string;
}
const props = withDefaults(defineProps<AutocompleteProps>(), {
  items: () => [],
  isAsync: false,
  selected: "",
});

const emit = defineEmits<{
  (e: "input", id: string): void;
  (e: "select", value: string): void;
}>();

const el = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const results = ref<string[]>([]);
const search = ref("");
const isLoading = ref(false);
const arrowCounter = ref(-1);
const { selected } = props;

if(selected) {
  search.value = selected;
}

const items = toRef(props, "items");

watch(items, (value, oldValue) => {
  results.value = value;
  if (value.length !== oldValue.length) {
    results.value = value;
    isLoading.value = false;
  }
});

const handleClickOutside = (e: any) => {
  if (isOpen.value && !e.target.closest(".autocomplete")) {
    isOpen.value = false;
    arrowCounter.value = -1;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

function setResult(result: string) {
  emit("select", result);
  search.value = result;
  isOpen.value = false;
}

function onChange(e: any) {
  emit("input", search.value);
  if (props.isAsync) {
    isLoading.value = true;
  } else {
    results.value = items.value.filter((item) => {
      return item.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
    });
    isOpen.value = true;
  }
}

function onArrowDown() {
  if (arrowCounter.value < results.value.length) {
    arrowCounter.value++;
  }
}

function onArrowUp() {
  if (arrowCounter.value > 0) {
    arrowCounter.value--;
  }
}

function onEnter() {
  if (results.value.length) {
    setResult(results.value[arrowCounter.value]);
  }
  search.value = results.value[arrowCounter.value];
  isOpen.value = false;
  arrowCounter.value--;
}
</script>

<style>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
