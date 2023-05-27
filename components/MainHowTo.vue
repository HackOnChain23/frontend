<template>
  <section
    id="howItWorks"
    class="container mx-auto backdrop-blur-sm h-auto p-6 pt-10"
  >
    <h1
      class="text-4xl w-auto h-16 text-cyan_gradient font-bold mb-4 font-mono"
    >
      How it works
    </h1>
    <div class="flex flex-wrap">
      <div
        class="h-[25rem] w-1/3 text-white p-2"
        v-for="(block, blockIndex) in blocks"
        :key="blockIndex"
      >
        <div
          class="border border-gray-500 rounded-md w-full h-full p-4 backdrop-blur-sm space-y-8"
        >
          <p
            class="text-white absolute text-[20rem] font-bold bottom-0 right-0 leading-[16rem] text-cyan_gradient opacity-20"
          >
            {{ blockIndex + 1 }}
          </p>
          <h2 class="text-2xl text-cyan_gradient z-20">
            {{ block.title }}
          </h2>
          <p>{{ block.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const blocks = [
  {
    title: "Make or Join a Round",
    description:
      "Start the game by either creating a new round or joining an existing one. Each round begins with a blank 2x3 grid that serves as the canvas for you and your fellow players to create a collective artwork.",
  },
  {
    title: "Design Your Block",
    description:
      "Channel your creativity to design your block with a unique pattern, design, or color. This block represents your individual artistic contribution to the shared artwork.",
  },
  {
    title: "Place Your Block",
    description:
      "Once you're satisfied with your design, place your block on any available spot on the grid. The game moves forward in a cyclic manner, with each player adding their block in turns.",
  },
  {
    title: "Invite a Friend",
    description:
      "Share the fun! Invite your friends to join the round and contribute their own blocks to the artwork. Their unique designs will add to the diversity and richness of the final piece.",
  },
  {
    title: "Witness the Transformation",
    description:
      "Observe as the grid transforms from a blank canvas to a unique collaborative artwork. Every filled 2x3 grid becomes an exclusive piece of art, the result of the collective creativity of all the players involved.",
  },
  {
    title: "Auction and Rewards",
    description:
      "When the grid is filled and the artwork is complete, it is transformed into a Non-Fungible Token (NFT) and put up for auction. The proceeds from the auction are equally divided among all the contributing artists, rewarding each for their part in the collaborative effort. Enjoy the thrill of seeing your creativity rewarded!",
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
