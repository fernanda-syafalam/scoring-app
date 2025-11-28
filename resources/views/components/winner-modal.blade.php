<!-- Main modal -->
<div id="modal-winner" class="hidden">
    <div data-modal-backdrop="static" tabindex="-1"
        class="flex fixed justify-center z-50 top-0 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen w-full bg-slate-950 bg-opacity-50">
        <div class="max-h-full my-auto w-3/4 md:w-1/2">
            <div class="bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-center justify-center p-4 rounded-t dark:border-gray-600">
                    <span
                        class="flex text-xl lg:text-2xl font-bold align-middle items-center justify-center  text-gray-900 dark:text-white">
                        PEMENANG PERTANDINGAN
                    </span>
                </div>
                <hr />
                <div class="place-items-center text-center p-4">
                    <div class="mb-4">
                        <span class="text-gray-600">Nama: </span> <span id="winner" class="font-semibold text-lg">Demas Ridwan</span><br />
                        <span class="text-gray-600">Sudut: </span> <span id="corner" class="font-semibold">Biru</span><br />
                        <span class="text-gray-600">Contingent: </span> <span id="contingent" class="font-semibold">PSCP</span>
                    </div>

                    <hr class="my-3" />

                    <div class="mb-4">
                        <span class="text-gray-600">Metode Kemenangan: </span>
                        <span id="win-method" class="font-bold text-green-600 text-lg">-</span>
                    </div>

                    <div class="mb-4">
                        <p class="text-gray-600 mb-2">Skor Akhir:</p>
                        <div class="flex justify-center gap-6">
                            <div>
                                <span class="text-red-600 font-bold text-xl">Merah: </span>
                                <span id="final-red-score" class="text-red-600 font-bold text-2xl">0</span>
                            </div>
                            <div>
                                <span class="text-blue-600 font-bold text-xl">Biru: </span>
                                <span id="final-blue-score" class="text-blue-600 font-bold text-2xl">0</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end w-full mt-4">
                        <button id="done-button" type="button"
                            class="bg-blueDefault block w-full shadow-inset-custom text-whiteDefault hover:bg-blueDefault rounded-lg text-md font-medium px-7 py-3 text-center items-center transform transition-transform ease-in-out duration-100 active:scale-95">
                            SELESAI
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<script src="{{ mix('js/winnerModal.js') }}"></script>
