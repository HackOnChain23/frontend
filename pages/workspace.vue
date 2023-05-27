<template>
  <section>
    <ParticlesComponent />
    <div
      class="container text-center w-full h-[62.5rem] mx-auto flex items-center justify-center backdrop-blur-sm"
      v-if="!walletId"
    >
      <p
        class="text-4xl h-16 animate-bounce text-cyan_gradient font-bold mb-4 font-mono"
      >
        Connect to wallet firstly
      </p>
    </div>
    <div v-if="walletId">
      <Workspace />
    </div>
  </section>
</template>
<script setup lang="ts">
const walletId = useState<string>("walletAddress");
</script>
