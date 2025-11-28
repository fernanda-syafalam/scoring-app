<!-- WMP Confirmation Modal -->
<div id="wmp-confirmation-modal" class="hidden">
    <div data-modal-backdrop="static" tabindex="-1"
        class="flex fixed justify-center z-50 top-0 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen w-full bg-slate-950 bg-opacity-50">
        <div class="max-h-full my-auto w-3/4 md:w-1/2 lg:w-2/5">
            <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Header -->
                <div class="flex items-center justify-center p-4 rounded-t dark:border-gray-600">
                    <span class="flex text-xl lg:text-2xl font-bold align-middle items-center justify-center text-gray-900 dark:text-white">
                        TETAPKAN PEMENANG
                    </span>
                </div>
                <hr />

                <!-- Content -->
                <div class="place-items-center text-center p-6">
                    <div class="mb-6">
                        <p class="text-lg mb-2">Nyatakan sebagai pemenang:</p>
                        <p class="text-2xl font-bold mb-1">
                            <span id="wmp-winner-name">-</span>
                        </p>
                        <p class="text-md mb-1">
                            Sudut: <span id="wmp-winner-corner" class="font-semibold">-</span>
                        </p>
                        <p class="text-md text-gray-600">
                            <span id="wmp-winner-contingent">-</span>
                        </p>
                    </div>

                    <!-- Buttons -->
                    <div class="flex flex-col gap-3 w-full mt-6">
                        <button id="wmp-btn-teknik" type="button"
                            class="bg-green-600 hover:bg-green-700 block w-full shadow-lg text-white rounded-lg text-lg font-semibold px-7 py-4 text-center items-center transform transition-transform ease-in-out duration-100 active:scale-95">
                            TEKNIK
                        </button>
                        <button id="wmp-btn-diskualifikasi" type="button"
                            class="bg-yellow-500 hover:bg-yellow-600 block w-full shadow-lg text-white rounded-lg text-lg font-semibold px-7 py-4 text-center items-center transform transition-transform ease-in-out duration-100 active:scale-95">
                            DISKUALIFIKASI
                        </button>
                        <button id="wmp-btn-cancel" type="button"
                            class="bg-gray-400 hover:bg-gray-500 block w-full shadow-lg text-white rounded-lg text-md font-medium px-7 py-3 text-center items-center transform transition-transform ease-in-out duration-100 active:scale-95">
                            BATAL
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
