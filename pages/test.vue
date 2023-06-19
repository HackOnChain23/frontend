<script setup lang="ts">
const testClick = () => {
  alert("teste")
  console.log("it has been clicked")
}
</script>

<template>
  <div class="relative bg-white">
    <div class="max-w-7xl mx-auto px-8">
      <div class="grid grid-cols-3 gap-y-10 gap-x-8 py-16">
        <!--    components list      -->
        <div
          class="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden"
        >
          <img
            src=""
            alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."
            class="object-center object-cover group-hover:opacity-75"
          />
          <div class="p-4 bg-white bg-opacity-60 text-sm">
            <button type="button" class="font-medium text-gray-900">
              <span class="absolute inset-0" aria-hidden="true"></span>
              Dropdown submenu
            </button>
          </div>
          <div class="flex flex-col justify-end items-center">
            <nav
              class="inline-flex rounded-md shadow-sm"
              aria-label="SelectAction"
            >
              <button
                type="button"
                aria-hidden="true"
                class="p-2"
                @click="testClick()"
              >
                <!--        mdiSelectPlace            -->
                zxczxc
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-5 h-5"
                >
                  <title>select</title>
                  <path
                    d="M4 3H5V5H3V4C3 3.5 3.5 3 4 3M20 3C20.5 3 21 3.5 21 4V5H19V3H20M15 5V3H17V5H15M11 5V3H13V5H11M7 5V3H9V5H7M21 12C21 12.5 20.5 13 20 13H19V11H21V12M15 13V11H17V13H15M11 13V11H13V13H11M7 13V11H9V13H7M4 13C3.5 13 3 12.5 3 12V11H5V13H4M3 7H5V9H3V7M21 7V9H19V7H21M7 16L12 21L17 16H7Z"
                  />
                </svg>
              </button>
              <button type="button" aria-hidden="true" class="p-2">
                <!--        mdiXml            -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="w-5 h-5"
                >
                  <title>code</title>
                  <path
                    d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
        <div
          class="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden"
        >
          <img
            src=""
            alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."
            class="object-center object-cover group-hover:opacity-75"
          />
          <div class="flex flex-col justify-end">
            <div class="p-4 bg-white bg-opacity-60 text-sm">
              <a href="#" class="font-medium text-gray-900">
                <span class="absolute inset-0" aria-hidden="true"></span>
                Basic Tees
              </a>
              <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">
                Shop now
              </p>
            </div>
          </div>
        </div>
        <!--   /END components list      -->
      </div>
    </div>
  </div>
</template>
