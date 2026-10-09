<script setup lang="ts">
defineProps<{
  mirrored?: boolean
}>()
</script>

<template>
  <svg
    class="botanical-spray"
    :class="{ 'botanical-spray-mirrored': mirrored }"
    viewBox="0 0 260 380"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 372C42 321 43 269 82 216C124 159 174 111 250 24" stroke-width="1.5" />
      <path d="M49 292C69 281 84 266 98 246M100 218C124 209 140 192 152 173M161 130C183 121 200 104 211 84" stroke-width="1" />
      <path d="M47 300C14 302 2 282 8 260C32 260 52 275 47 300ZM68 262C39 250 35 228 48 210C70 220 80 241 68 262ZM100 226C75 207 80 184 100 171C119 190 119 210 100 226ZM126 186C110 161 121 141 144 135C158 157 151 177 126 186ZM163 143C145 123 153 102 175 94C191 113 187 134 163 143ZM196 103C180 80 191 61 215 57C227 78 218 97 196 103Z" stroke-width="1.1" />
      <path d="M20 266C31 275 39 285 47 300M51 216C57 232 63 247 68 262M87 178C92 193 97 210 100 226M132 141C130 157 128 173 126 186M164 99C164 113 164 130 163 143M204 61C203 75 200 91 196 103" stroke-width=".65" opacity=".75" />
      <path d="M98 246C79 229 76 209 84 193C103 205 110 226 98 246ZM151 173C137 153 141 132 158 120C173 139 169 160 151 173ZM210 84C201 64 208 46 227 38C238 58 231 76 210 84Z" stroke-width="1.1" />
      <path d="M86 195C91 211 95 229 98 246M157 122C155 139 153 157 151 173M226 40C220 56 215 71 210 84" stroke-width=".65" opacity=".75" />
      <path d="M80 216C63 204 56 189 62 174M142 145C129 131 126 116 133 102M187 105C176 91 174 77 181 65" stroke-width=".8" />
      <path d="M106 191C94 181 94 166 106 155C118 166 118 181 106 191ZM181 112C170 102 170 88 181 78C192 88 192 102 181 112Z" stroke-width="1.05" />
      <circle cx="106" cy="173" r="4" stroke-width=".8" />
      <circle cx="181" cy="95" r="3.5" stroke-width=".8" />
      <path d="M61 175C54 164 56 154 64 149C73 157 73 167 61 175ZM133 103C128 92 132 83 141 80C148 89 145 98 133 103ZM181 66C176 56 180 47 189 45C196 54 193 62 181 66Z" stroke-width=".9" />
    </g>
    <g fill="currentColor" fill-opacity=".09" stroke="currentColor" stroke-width=".8">
      <path d="M106 149C112 157 116 162 106 169C96 162 100 157 106 149Z" />
      <path d="M121 164C115 172 112 177 106 169C110 157 116 160 121 164Z" />
      <path d="M116 183C107 180 101 179 106 169C119 169 118 175 116 183Z" />
      <path d="M96 183C97 173 98 167 106 169C111 181 105 183 96 183Z" />
      <path d="M91 164C100 160 105 157 106 169C96 177 93 171 91 164Z" />
      <path d="M181 73C187 81 190 85 181 91C172 85 175 81 181 73Z" />
      <path d="M194 87C189 94 186 99 181 91C185 81 190 83 194 87Z" />
      <path d="M190 103C182 101 177 100 181 91C192 91 192 97 190 103Z" />
      <path d="M173 103C174 95 175 90 181 91C185 101 180 103 173 103Z" />
      <path d="M169 87C176 84 180 81 181 91C172 98 170 93 169 87Z" />
    </g>
  </svg>
</template>

<style scoped>
.botanical-spray {
  overflow: visible;
}

.botanical-spray-mirrored {
  transform: scaleX(-1);
}
</style>