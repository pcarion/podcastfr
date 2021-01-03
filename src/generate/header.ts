export default function header(lines: string[]): void {
  lines.push(`
  <div class="md:flex md:items-center md:justify-between md:space-x-5 my-4">
    <div class="flex items-start space-x-5">
      <div class="flex-shrink-0">
        <div class="relative">
          <img class="h-16 w-16 rounded-full" src="/assets/images/FR.png" alt="">
          <span class="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
        </div>
      </div>
      <!--
          Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around.
        -->
      <div class="pt-1.5">
        <h1 class="text-2xl font-bold text-gray-900">Podcasts Tech en Français</h1>
        <p class="text-sm font-medium text-gray-500">Vous pouvez ajouter le votre gratuitement sur <a href="https://github.com/pcarion/podcastfr" class="text-gray-900">https://github.com/pcarion/podcastfr</a></p>
      </div>
    </div>
  </div>
  `);
}
