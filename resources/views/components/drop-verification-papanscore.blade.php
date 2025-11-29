<!-- Papan Score Drop Verification Result Modal -->
<div id="dropVerificationResultModal" style="display: none">
    <div data-modal-backdrop="static" tabindex="-1" class="flex fixed justify-center items-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen w-full bg-slate-950 bg-opacity-70">
        <div class="max-h-full w-1/2">
            <div class="bg-white rounded-lg shadow dark:bg-gray-700 py-12 px-8">
                <div class="flex flex-col items-center justify-center">
                    <span class="flex text-2xl lg:text-3xl font-bold align-middle items-center justify-center text-gray-900 dark:text-white mb-6">
                        HASIL KEPUTUSAN
                    </span>

                    <!-- Result Display -->
                    <div id="papan-score-result" class="shadow-inset-custom text-2xl lg:text-4xl text-white flex items-center justify-center rounded-[20px] w-full h-[120px] lg:h-[150px] bg-grayDefault font-bold">
                        <!-- Result will be injected here -->
                    </div>

                    <!-- Auto-close indicator -->
                    <div class="mt-6 text-center">
                        <p class="text-gray-600 dark:text-gray-300 text-sm lg:text-base">
                            Menutup otomatis dalam <span id="auto-close-countdown" class="font-bold">5</span> detik
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
