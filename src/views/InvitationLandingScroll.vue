<script setup lang="ts">
import { ref } from "vue";

import ShutterReveal from "@/components/wedding/ShutterReveal.vue";
import ScratchCard from "@/components/wedding/ScratchCard.vue";
import CountdownTimer from "@/components/wedding/CountdownTimer.vue";
import ProgramTimeline from "@/components/wedding/ProgramTimeline.vue";
import AddToCalendar from "@/components/wedding/AddToCalendar.vue";
import ThankyouCard from "@/components/wedding/ThankyouCard.vue";
import GoldDivider from "@/components/ui/GoldDivider.vue";
import BackgroundMusic from "@/components/wedding/BackgroundMusic.vue";
import InvitationHeader from "@/components/wedding/InvitationHeader.vue";
import EmblaCarousel from "@/components/wedding/EmblaCarousel.vue";
import Labels from "@/config/labels.json";

import { useCountdown } from "@/composables/useCountdown";

const appUnlocked = ref(false);
const { timeRemaining } = useCountdown(Labels.date);
</script>

<template>
  <div class="min-h-screen bg-luxury-dark text-luxury-cream overflow-x-hidden relative">
    <BackgroundMusic v-if="appUnlocked" />

    <ShutterReveal @unlocked="appUnlocked = true" />

    <main v-if="appUnlocked" class="invitation-shell w-full relative z-10 text-center">
      <EmblaCarousel>
        <template #panel-2>
          <InvitationHeader />
        </template>
        <template #panel-1>
          <div class="w-full px-5 py-7">
            <p class="intro-kicker text-lg tracking-[0.32em] uppercase text-luxury-gold/80">
              A Timeless Evening
            </p>
            <h2 class="intro-title mx-auto mt-5 max-w-[300px] font-serif text-[2.7rem] leading-[0.95] text-luxury-cream">
              The Celebration Begins
            </h2>
            <div class="mx-auto my-5 h-px w-20 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
            <p class="intro-body mx-auto max-w-[260px] text-sm font-sans uppercase tracking-[0.18em] text-gray-200">
              Scroll gently to unveil each detail before your invitation opens.
            </p>
          </div>
        </template>
        <template #panel-3>
          <ScratchCard />
        </template>
        <template #panel-4>
          <CountdownTimer :time-data="timeRemaining" />
          <GoldDivider />
          <AddToCalendar />
        </template>
        <template #panel-5>
          <ProgramTimeline />
        </template>
        <template #panel-6>
          <section class="mx-auto w-full space-y-5 rounded-[28px] p-5 ">
            <div class="flex flex-col items-center justify-center space-y-2">
              <div class="text-luxury-gold text-lg">📍</div>
              <h3 class="font-serif text-xl tracking-[0.3em] uppercase text-luxury-cream">
                Venue
              </h3>
              <div class="h-px w-14 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
              <h4 class="pt-1 text-lg font-serif text-white">
                {{ Labels.venueName }}
              </h4>
              <p class="text-base font-sans tracking-wider text-gray-400 uppercase">
                {{ Labels.venueAddress }}
              </p>
            </div>

            <div class="mx-auto aspect-video w-full overflow-hidden rounded-[18px] border border-luxury-gold/20 shadow-[0_10px_25px_rgba(0,0,0,0.22)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.841394113391!2d73.02792447525505!3d19.158418749379884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bf9ae5e1d6f9%3A0xe4fd6e9446ad12bf!2sGreen%20Lawn%20Wedding%20Hall%2C%20Kalsekar!5e0!3m2!1sen!2sin!4v1787377938629!5m2!1sen!2sin"
                width="600" height="450" style="border:0;" allowfullscreen loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>

            <div class="flex items-center justify-center gap-3 pt-1 text-[9px] font-sans tracking-[0.2em] uppercase">
              <a href="https://maps.app.goo.gl/jn8cZxcHry6RbfPH8" target="_blank" rel="noreferrer"
                class="rounded border border-luxury-gold/30 bg-luxury-card/30 px-3 py-1.5 text-base text-luxury-gold transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-dark">
                Open Map
              </a>
              <a href="https://maps.apple.com/?q=Green%20Lawn%20Wedding%20Hall%2C%20Kalsekar&ll=19.1584187,73.0279245"
                target="_blank" rel="noreferrer"
                class="rounded border border-luxury-gold/30 bg-luxury-card/30 px-3 py-1.5 text-base text-luxury-gold transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-dark">
                Apple Maps
              </a>
            </div>
          </section>
        </template>
        <template #panel-7>
          <ThankyouCard />
        </template>
      </EmblaCarousel>
    </main>
  </div>
</template>
