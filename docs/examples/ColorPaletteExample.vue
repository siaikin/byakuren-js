// #region template
<template>
  <div>
    <form @submit="handleExtractColors">
      <fieldset>
        <legend>Select image</legend>

        <label>
          Source of image:
          <select v-model="tab">
            <option value="url">URL</option>
            <option value="file">File</option>
          </select>
        </label>

        <br />
        <br />

        <template v-if="tab === 'url'">
          <label>
            From URL:
            <input v-model="url" type="url" placeholder="image URL" />
          </label>
        </template>
        <template v-else-if="tab === 'file'">
          <label>
            From image file:
            <input type="file" accept="image/*" @change="handleFileChange" />
          </label>
        </template>
      </fieldset>

      <br />

      <label>
        Max color count:
        <input v-model.number="maxColorCount" type="range" min="8" max="256" />
        {{ maxColorCount }}
      </label>

      <br />

      <button type="submit" style="float: right">Click to extract colors</button>
    </form>

    <br />

    <fieldset>
      <legend>Colors</legend>

      <button
        type="button"
        v-for="color in colors"
        :key="color"
        :style="{ backgroundColor: color, color: color }"
        :title="color"
      >
        {{ color }}
      </button>
    </fieldset>
  </div>
</template>
// #endregion template

<script setup lang="ts">
// #region script
import { extractColorPalette, bkrRgbToHex } from 'byakuren-js';
import { ref, watch } from 'vue';

const tab = ref('file');
const url = ref('');

const maxColorCount = ref(16);

const colors = ref<string[]>([]);

function handleExtractColors(event: Event) {
  event.preventDefault();

  switch (tab.value) {
    case 'url':
      extractFromUrl(url.value);
      break;
    case 'file':
      {
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files?.[0];
        extractFromFile(file as File);
      }
      break;
  }
}

async function extractFromFile(image: File) {
  colors.value = (await extractColorPalette(image, maxColorCount.value)).map((color) =>
    bkrRgbToHex(color.red, color.green, color.blue)
  );
}

async function extractFromUrl(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  await extractFromFile(blob as File);
}

// #endregion script
</script>

<style scoped></style>
