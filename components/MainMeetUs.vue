<template>
  <section
    id="meetUs"
    class="container mx-auto h-auto backdrop-blur-sm p-6 mt-10 mb-40"
  >
    <h1
      class="text-4xl h-16 text-cyan_gradient font-bold text-white mb-4 text-white font-mono"
    >
      Meet us
    </h1>
    <div
      class="w-full h-auto divide-x flex divide-transparent items-center justify-center text-center"
    >
      <div
        class="w-full h-80 px-8"
        v-for="(elem, elemIndex) in devData"
        :key="elemIndex"
      >
        <img
          class="shadow-blue-500 shadow-xl mb-3 w-full h-80 object-center object-cover"
          :src="elem.photo"
        />
        <p class="text-lg text-white">{{ elem.role }}</p>
        <p class="text-white text-cyan_gradient">{{ elem.name }}</p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const devData = [
  {
    role: "Backend Dev",
    name: "Szacilowski",
    photo: "/assets/ourPhotos/szacilowski.jpg",
  },

  {
    role: "Frontend Dev",
    name: "Paluch77",
    photo: "/assets/ourPhotos/paluch.jpeg",
  },
  {
    role: "Blockchain Dev",
    name: "Lechu13",
    photo: "/assets/ourPhotos/lechu.jpeg",
  },

  {
    role: "Backend Dev",
    name: "Sitletto",
    photo: "/assets/ourPhotos/mateusz.jpg",
  },
];
</script>
<style lang="sass">
.text
    &-cyan_gradient
        background: rgb(73,69,252)
        background: linear-gradient(90deg, rgba(73,69,252,1) 1%, rgba(6, 162, 212,1) 40%)
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
</style>
