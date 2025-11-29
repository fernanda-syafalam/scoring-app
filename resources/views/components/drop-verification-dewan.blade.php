<!-- Dewan Drop Verification Modal -->
<div id="dropVerificationModal" style="display: none">
    <div data-modal-backdrop="static" tabindex="-1" class="flex fixed justify-center z-50 top-0 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen w-full bg-slate-950 bg-opacity-50">
        <div class="max-h-full w-2/3">
            <div class="bg-white rounded-lg shadow dark:bg-gray-700 pt-5 pb-8">
                <div class="flex items-center justify-center p-4 rounded-t dark:border-gray-600">
                    <span class="flex text-xl lg:text-2xl font-bold align-middle items-center justify-center text-gray-900 dark:text-white">
                         PENGAMBILAN KEPUTUSAN
                    </span>
                </div>

                <!-- Judge Votes Display -->
                <div class="grid grid-cols-3 gap-8 place-items-center text-center px-10 mb-6">
                    <div class="w-full">
                        <h2 class="text-lg lg:text-xl font-bold mb-3">JURI 1</h2>
                        <button id="jurror1-red" type="button" disabled class="flex justify-center items-center w-full h-3/4 lg:h-[60px] mt-2 bg-grayDefault hover:opacity-75 shadow-inset-custom rounded-[14px] py-4 lg:py-2.5 text-center">
                            <p class="text-sm lg:text-lg font-medium text-whiteDefault">SUDUT MERAH</p>
                        </button>
                        <button id="jurror1-blue" type="button" disabled class="flex justify-center items-center w-full h-3/4 lg:h-[60px] mt-2 bg-grayDefault hover:opacity-75 shadow-inset-custom rounded-[14px] py-4 lg:py-2.5 text-center">
                            <p class="text-sm lg:text-lg font-medium text-whiteDefault">SUDUT BIRU</p>
                        </button>
                        <button id="jurror1-invalid" type="button" disabled class="flex justify-center items-center w-full h-3/4 lg:h-[60px] mt-2 bg-grayDefault hover:opacity-75 shadow-inset-custom rounded-[14px] py-4 lg:py-2.5 text-center">
                            <p class="text-sm lg:text-lg font-medium text-whiteDefault">TIDAK VALID</p>
                        </button>
                    </div>
                    <div class="w-full">
                        <h2 class="text-lg lg:text-xl font-bold mb-3">JURI 2</h2>
                        <button id="jurror2-red" type="button" disabled class="flex justify-center items-center w-full h-3/4 lg:h-[60px] mt-2 bg-grayDefault hover:opacity-75 shadow-inset-custom rounded-[14px] py-4 lg:py-2.5 text-center">
                            <p class="text-sm lg:text-lg font-medium text-whiteDefault">SUDUT MERAH</p>
                        </button>
                        <button id="jurror2-blue" type="button" disabled class="flex justify-center items-center w-full h-3/4 lg:h-[60px] mt-2 bg-grayDefault hover:opacity-75 shadow-inset-custom rounded-[14px] py-4 lg:py-2.5 text-center">
                            <p class="text-sm lg:text-lg font-medium text-whiteDefault">SUDUT BIRU</p>
                        </button>
                        <button id="jurror2-invalid" type="button" disabled class="flex justify-center items-center w-full h-3/4 lg:h-[60px] mt-2 bg-grayDefault hover:opacity-75 shadow-inset-custom rounded-[14px] py-4 lg:py-2.5 text-center">
                            <p class="text-sm lg:text-lg font-medium text-whiteDefault">TIDAK VALID</p>
                        </button>
                    </div>
                    <div class="w-full">
                        <h2 class="text-lg lg:text-xl font-bold mb-3">JURI 3</h2>
                        <button id="jurror3-red" type="button" disabled class="flex justify-center items-center w-full h-3/4 lg:h-[60px] mt-2 bg-grayDefault hover:opacity-75 shadow-inset-custom rounded-[14px] py-4 lg:py-2.5 text-center">
                            <p class="text-sm lg:text-lg font-medium text-whiteDefault">SUDUT MERAH</p>
                        </button>
                        <button id="jurror3-blue" type="button" disabled class="flex justify-center items-center w-full h-3/4 lg:h-[60px] mt-2 bg-grayDefault hover:opacity-75 shadow-inset-custom rounded-[14px] py-4 lg:py-2.5 text-center">
                            <p class="text-sm lg:text-lg font-medium text-whiteDefault">SUDUT BIRU</p>
                        </button>
                        <button id="jurror3-invalid" type="button" disabled class="flex justify-center items-center w-full h-3/4 lg:h-[60px] mt-2 bg-grayDefault hover:opacity-75 shadow-inset-custom rounded-[14px] py-4 lg:py-2.5 text-center">
                            <p class="text-sm lg:text-lg font-medium text-whiteDefault">TIDAK VALID</p>
                        </button>
                    </div>
                </div>

                <!-- Divider -->
                <div class="border-t border-gray-300 dark:border-gray-600 mx-10 my-4"></div>

                <!-- Dewan Override Section -->
                <div class="px-10">
                    <h3 class="text-center text-lg lg:text-xl font-bold mb-4 dark:text-white">KEPUTUSAN DEWAN</h3>
                    <div class="flex items-center justify-center gap-4 mb-6">
                        <button id="dewan-override-blue" type="button" class="bg-grayDefault shadow-inset-custom w-1/3 lg:h-[70px] hover:bg-blueDark focus:ring-4 focus:outline-none focus:ring-blueDark focus:bg-blueDark rounded-[14px] py-4 lg:py-2.5 inline-flex items-center justify-center transform transition-transform ease-in-out duration-100 active:scale-95">
                            <p class="text-sm lg:text-xl font-bold text-whiteDefault">SUDUT BIRU</p>
                        </button>
                        <button id="dewan-override-invalid" type="button" class="bg-grayDefault shadow-inset-custom w-1/3 lg:h-[70px] hover:bg-yellowDark focus:ring-4 focus:outline-none focus:ring-yellowDark focus:bg-yellowDark rounded-[14px] py-4 lg:py-2.5 inline-flex items-center justify-center transform transition-transform ease-in-out duration-100 active:scale-95">
                            <p class="text-sm lg:text-xl font-bold text-whiteDefault">TIDAK VALID</p>
                        </button>
                        <button id="dewan-override-red" type="button" class="bg-grayDefault shadow-inset-custom w-1/3 lg:h-[70px] hover:bg-redDark focus:ring-4 focus:outline-none focus:ring-redDark focus:bg-redDark rounded-[14px] py-4 lg:py-2.5 inline-flex items-center justify-center transform transition-transform ease-in-out duration-100 active:scale-95">
                            <p class="text-sm lg:text-xl font-bold text-whiteDefault">SUDUT MERAH</p>
                        </button>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex justify-end gap-4">
                        <button id="cancel-popup" type="button" class="bg-grayDefault shadow-inset-custom text-whiteDefault hover:bg-gray-600 rounded-lg text-md font-medium px-7 py-3 text-center inline-flex items-center transform transition-transform ease-in-out duration-100 active:scale-95">
                            BATAL
                        </button>
                        <button id="confirm-popup" type="button" class="bg-blueDefault shadow-inset-custom text-whiteDefault hover:bg-blueDark rounded-lg text-md font-medium px-7 py-3 text-center inline-flex items-center transform transition-transform ease-in-out duration-100 active:scale-95">
                            KONFIRMASI
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
