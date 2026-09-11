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
          <p class="intro-kicker text-lg tracking-[0.32em] uppercase text-luxury-gold/80">
            A Timeless Evening
          </p>
          <h2 class="intro-title font-serif text-4xl leading-[1.08] text-luxury-cream mx-auto max-w-[280px]">
            The Celebration Begins
          </h2>
          <p class="intro-body text-sm font-sans tracking-[0.14em] uppercase text-gray-200 mx-auto max-w-[260px]">
            Scroll gently to unveil each detail before your invitation opens.
          </p>
        </template>
        <!-- </article> -->

        <!-- <template #panel-3>
          <p
            class="intro-kicker text-[10px] tracking-[0.32em] uppercase text-luxury-gold/80"
          >
            With Family & Blessings
          </p>
          <h2
            class="intro-title font-serif text-[38px] leading-[1.08] text-luxury-cream mx-auto max-w-[280px]"
          >
            Witness Moments Crafted In Gold
          </h2>
          <p
            class="intro-body text-[11px] font-sans tracking-[0.14em] uppercase text-gray-200 mx-auto max-w-[260px]"
          >
            Every scroll step frames the invitation like a cinematic reveal.
          </p>
        </template> -->
        <!-- <template #panel-4>
          <p
            class="intro-kicker text-[10px] tracking-[0.32em] uppercase text-luxury-gold/80"
          >
            One Final Gesture
          </p>
          <h2
            class="intro-title font-serif text-[38px] leading-[1.08] text-luxury-cream mx-auto max-w-[280px]"
          >
            Scratch To Reveal The Date
          </h2>
          <p
            class="intro-body text-[11px] font-sans tracking-[0.14em] uppercase text-gray-100 mx-auto max-w-[260px]"
          >
            Continue scrolling and the invitation card appears without
            interruption.
          </p>
        </template> -->
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
          <section class="space-y-4">
            <div class="flex flex-col items-center justify-center space-y-1">
              <div class="text-luxury-gold text-lg">📍</div>
              <h3 class="font-serif text-xl tracking-[0.3em] uppercase text-luxury-cream">
                Venue
              </h3>
              <h4 class="text-lg font-serif text-white pt-1">
                {{ Labels.venueName }}
              </h4>
              <p class="text-base font-sans tracking-wider text-gray-400 uppercase">
                {{ Labels.venueAddress }}
              </p>
            </div>

            <div
              class="w-full max-w-xs mx-auto aspect-video rounded-lg overflow-hidden border border-luxury-gold/20 shadow-premium relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.841394113391!2d73.02792447525505!3d19.158418749379884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bf9ae5e1d6f9%3A0xe4fd6e9446ad12bf!2sGreen%20Lawn%20Wedding%20Hall%2C%20Kalsekar!5e0!3m2!1sen!2sin!4v1787377938629!5m2!1sen!2sin"
                width="600" height="450" style="border:0;" allowfullscreen loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>

            <div class="flex items-center justify-center gap-3 pt-1 text-[9px] font-sans tracking-widest uppercase">
              <a href="https://maps.app.goo.gl/jn8cZxcHry6RbfPH8" target="_blank" rel="noreferrer"
                class="text-base px-3 py-1.5 border border-luxury-gold/30 bg-luxury-card/30 rounded text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300">
                Open Map
              </a>
              <a href="https://maps.apple.com/?q=Green%20Lawn%20Wedding%20Hall%2C%20Kalsekar&ll=19.1584187,73.0279245"
                target="_blank" rel="noreferrer"
                class="text-base px-3 py-1.5 border border-luxury-gold/30 bg-luxury-card/30 rounded text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300">
                Apple Maps
              </a>
            </div>
          </section>
        </template>
        <template #panel-7>
          <ThankyouCard />
        </template>
      </EmblaCarousel>

      <!-- </div> -->
    </main>
  </div>
</template>
