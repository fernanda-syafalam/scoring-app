<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PENCAK SILAT | {{ $title }}</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <script src="{{ mix('js/app.js') }}"></script>
</head>

<body class="font-poppins">
    <header>
        <label for="user"></label><input id="user" type="text" hidden="hidden" data-user="{{ $gelangang }}" detail-user="{{ auth()->user() }}">
        <x-winner-modal />
        <x-wmp-confirmation-modal />
        <x-websocket-status />

        <div class="flex justify-between">
            <div>
                <div class="flex w-[200px] justify-start rounded-br-[90px] bg-blueDefault py-3 pl-6 shadow-inset-custom md:w-[280px] lg:w-[395px] xl:w-[500px] 2xl:w-[600px]">
                    <p id="nama_biru" class="text-xl font-bold text-whiteDefault">SUDUT BIRU</p>
                </div>
                <div class="flex w-[150px] justify-start rounded-br-[90px] bg-blueDark py-2 pl-6 shadow-inset-custom md:w-[200px] lg:w-[250px] xl:w-[300px]">
                    <p id="kontingen_biru" class="text-base text-whiteDefault">KONTINGEN</p>
                </div>
            </div>
            <div>
                <div class="mx-auto flex w-[150px] justify-center rounded-b-[90px] bg-grayDefault py-3 shadow-inset-custom md:w-[205px] lg:w-[230px] xl:w-[285px] 2xl:w-[325px]">
                    <p id="babak" class="text-xl font-bold text-whiteDefault">BABAK</p>
                </div>
                <div class="mx-auto flex w-[100px] justify-center rounded-b-[90px] bg-grayDark py-2 shadow-inset-custom md:w-[105px] lg:w-[140px] xl:w-[185px] 2xl:w-[200px]">
                    <p id="round" class="text-base font-bold text-whiteDefault">RONDE</p>
                </div>
            </div>
            <div>
                <div class="flex w-[200px] justify-end rounded-bl-[90px] bg-redDefault py-3 pr-6 shadow-inset-custom sm:w-[200px] md:w-[280px] lg:w-[395px] xl:w-[500px] 2xl:w-[600px]">
                    <p id="nama_merah" class="text-xl font-bold text-whiteDefault">SUDUT MERAH</p>
                </div>
                <div class="ml-auto flex w-[150px] justify-end rounded-bl-[90px] bg-redDark py-2 pr-6 shadow-inset-custom md:w-[200px] lg:w-[250px] xl:w-[300px]">
                    <p id="kontingen_merah" class="text-base text-whiteDefault">KONTINGEN</p>
                </div>
            </div>
        </div>
        <x-drop-verification-result />
    </header>
    <s class="text-whiteDefault">1</s>
    <div class="flex justify-between">
        <div class="mt-[5%] flex w-full">
            <div id="round-1-blueInput-div" class="w-[70%] rounded-r-[20px] bg-blueDefault py-3 pl-6 shadow-inset-custom">
                <p id="round-1-blueInput" class="text-whiteDefault"></p>
            </div>
            <div id="round-1-blueScore-div" class="ml-[2%] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-blueDefault shadow-inset-custom">
                <p id="round-1-blueScore" class="text-whiteDefault">0</p>
            </div>
        </div>
        <div class="mt-[5%] flex w-full justify-end">
            <div id="round-1-redScore-div" class="mr-[2%] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-redDefault shadow-inset-custom">
                <p id="round-1-redScore" class="text-whiteDefault">0</p>
            </div>
            <div id="round-1-redInput-div" class="w-[70%] rounded-l-[20px] bg-redDefault py-3 pr-6 shadow-inset-custom">
                <p id="round-1-redInput" class="text-right text-whiteDefault"></p>
            </div>
        </div>
    </div>
    <div class="flex justify-between">
        <div class="mt-[2%] flex w-full">
            <div id="round-2-blueInput-div" class="w-[70%] rounded-r-[20px] bg-grayDefault py-3 pl-6">
                <p id="round-2-blueInput" class="text-whiteDefault"></p>
            </div>
            <div id="round-2-blueScore-div" class="ml-[2%] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-grayDefault">
                <p id="round-2-blueScore" class="text-whiteDefault"></p>
                <p id="round-2-blueScore" class="text-whiteDefault"></p>
            </div>
        </div>
        <div class="mt-[2%] flex w-full justify-end">
            <div id="round-2-redScore-div" class="mr-[2%] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-grayDefault">
                <p id="round-2-redScore" class="text-whiteDefault"></p>
            </div>
            <div id="round-2-redInput-div" class="w-[70%] rounded-l-[20px] bg-grayDefault py-3 pr-6">
                <p id="round-2-redInput" class="text-right text-whiteDefault"></p>
            </div>
        </div>
    </div>
    <div class="flex justify-between">
        <div class="mt-[2%] flex w-full">
            <div id="round-3-blueInput-div" class="w-[70%] rounded-r-[20px] bg-grayDefault py-3 pl-6">
                <p id="round-3-blueInput" class="text-whiteDefault"></p>
            </div>
            <div id="round-3-blueScore-div" class="ml-[2%] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-grayDefault">
                <p id="round-3-blueScore" class="text-whiteDefault"></p>
            </div>
        </div>
        <div class="mt-[2%] flex w-full justify-end">
            <div id="round-3-redScore-div" class="mr-[2%] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-grayDefault">
                <p id="round-3-redScore" class="text-whiteDefault"></p>
            </div>
            <div id="round-3-redInput-div" class="w-[70%] rounded-l-[20px] bg-grayDefault py-3 pr-6">
                <p id="round-3-redInput" class="text-right text-whiteDefault"></p>
            </div>
        </div>
    </div>

    <div class="ml-[1%] mr-[2%] mt-[3%] flex justify-between">
        <!--left side-->
        <div class="flex w-[50%] flex-col justify-start">
            <div class="flex w-[70%] justify-between">
                <button type="button" id="binaan-biru-pertama"
                    class="focus-red-button mb-2 mr-2 flex w-[25%] items-center justify-center rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-biru/binaan-pertama.png') }}" width="45" height="22" alt="Binaan Pertama">
                </button>
                <button type="button" id="teguran-biru-pertama"
                    class="focus-red-button mb-2 mr-2 flex w-[25%] items-center justify-center rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-biru/teguran-pertama.png') }}" width="18" height="20" alt="teguran pertama">
                </button>
                <button type="button" id="peringatan-biru-pertama"
                    class="focus-red-button mb-2 mr-2 flex w-[50%] items-center justify-center gap-4 rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-biru/teguran-pertama.png') }}" width="18" height="20" alt="peringatan pertama">
                    <img src="{{ asset('images/sudut-biru/peringatan.png') }}" width="40" height="20" alt="peringatan pertama">
                </button>
            </div>

            <div class="flex w-[70%] justify-between">
                <button type="button" id="binaan-biru-kedua"
                    class="mb-2 mr-2 flex w-[25%] items-center justify-center rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-biru/binaan-kedua.png') }}" width="45" height="22" alt="Binaan Kedua">
                </button>
                <button type="button" id="teguran-biru-kedua"
                    class="mb-2 mr-2 flex inline-flex w-[25%] items-center justify-center rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-biru/teguran-kedua.png') }}" width="18" height="22" alt="Teguran Kedua">
                </button>
                <button type="button" id="peringatan-biru-kedua"
                    class="mb-2 mr-2 flex inline-flex w-[50%] items-center justify-center gap-4 rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-biru/teguran-kedua.png') }}" width="18" height="20" alt="peringatan pertama">
                    <img src="{{ asset('images/sudut-biru/peringatan.png') }}" width="40" height="20" alt="peringatan pertama">
                </button>
            </div>

            <div class="flex w-[70%] justify-between">
                <button type="button" id="jatuhan-biru-plus"
                    class="mb-2 mr-2 flex inline-flex w-[25%] items-center items-center justify-center rounded-[14px] bg-blueDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <p class="text-lg font-bold text-whiteDefault">DROP +</p>
                </button>
                <button type="button" id="jatuhan-biru-minus"
                    class="mb-2 mr-2 flex inline-flex w-[25%] items-center items-center justify-center rounded-[14px] bg-blueDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <p class="text-lg font-bold text-whiteDefault">DROP -</p>
                </button>
                <button type="button" id="peringatan-biru-ketiga"
                    class="mb-2 mr-2 flex inline-flex w-[50%] items-center justify-center gap-4 rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-biru/teguran-ketiga.png') }}" width="18" height="20" alt="peringatan pertama">
                    <img src="{{ asset('images/sudut-biru/peringatan.png') }}" width="40" height="20" alt="peringatan pertama">
                </button>
            </div>
            <div class="flex w-[70%] justify-between">
                <button type="button" id="popup-biru"
                    class="mb-2 mr-2 flex inline-flex w-[100%] items-center items-center justify-center rounded-[14px] bg-blueDefault px-5 py-2.5 text-center text-sm shadow-inset-custom hover:bg-blueDefault disabled:cursor-not-allowed">
                    <p class="text-lg font-bold text-whiteDefault">CALL</p>
                </button>
            </div>
            <div class="flex w-[70%] justify-between">
                <button type="button" id="disk-biru"
                    class="focus-red-button mb-2 mr-2 flex inline-flex w-[100%] items-center items-center justify-center rounded-[14px] bg-blueDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <p class="text-lg font-bold text-whiteDefault">WMP</p>
                </button>
            </div>
        </div>

        <x-logout-button></x-logout-button>

        <!--right side-->
        <div class="flex w-[50%] flex-col items-end justify-start">
            <div class="flex w-[70%] justify-between">
                <button type="button" id="peringatan-merah-pertama"
                    class="mb-2 mr-2 flex w-[50%] items-center justify-center gap-4 rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-merah/peringatan.png') }}" width="40" height="22" alt="Binaan Pertama">
                    <img src="{{ asset('images/sudut-merah/teguran-pertama.png') }}" width="18" height="22" alt="Binaan Pertama">
                </button>
                <button type="button" id="teguran-merah-pertama"
                    class="mb-2 mr-2 flex inline-flex w-[25%] items-center justify-center rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-merah/teguran-pertama.png') }}" width="18" height="22" alt="Binaan Pertama">
                </button>
                <button type="button" id="binaan-merah-pertama"
                    class="mb-2 mr-2 flex inline-flex w-[25%] items-center justify-center rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-merah/binaan-pertama.png') }}" width="45" height="22" alt="Binaan Pertama">
                </button>
            </div>

            <div class="flex w-[70%] justify-between">
                <button type="button" id="peringatan-merah-kedua"
                    class="mb-2 mr-2 flex inline-flex w-[50%] items-center justify-center gap-4 rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-merah/peringatan.png') }}" width="40" height="22" alt="Binaan Pertama">
                    <img src="{{ asset('images/sudut-merah/teguran-kedua.png') }}" width="18" height="22" alt="Binaan Pertama">
                </button>
                <button type="button" id="teguran-merah-kedua"
                    class="mb-2 mr-2 flex inline-flex w-[25%] items-center items-center justify-center rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-merah/teguran-kedua.png') }}" width="18" height="22" alt="Binaan Pertama">
                </button>
                <button type="button" id="binaan-merah-kedua"
                    class="mb-2 mr-2 flex inline-flex w-[25%] items-center items-center justify-center rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-merah/binaan-kedua.png') }}" width="50" height="22" alt="Binaan Pertama">
                </button>
            </div>

            <div class="flex w-[70%] justify-between">
                <button type="button" id="peringatan-merah-ketiga"
                    class="mb-2 mr-2 flex inline-flex w-[50%] items-center justify-center gap-4 rounded-[14px] bg-grayDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <img src="{{ asset('images/sudut-merah/peringatan.png') }}" width="40" height="22" alt="Binaan Pertama">
                    <img src="{{ asset('images/sudut-merah/teguran-ketiga.png') }}" width="18" height="22" alt="Binaan Pertama">
                </button>
                <button type="button" id="jatuhan-merah-minus"
                    class="mb-2 mr-2 flex inline-flex w-[25%] items-center items-center justify-center rounded-[14px] bg-redDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <p class="text-lg font-bold text-whiteDefault">DROP -</p>
                </button>
                <button type="button" id="jatuhan-merah-plus"
                    class="mb-2 mr-2 flex inline-flex w-[25%] items-center items-center justify-center rounded-[14px] bg-redDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <p class="text-lg font-bold text-whiteDefault">DROP +</p>
                </button>

            </div>
            <div class="flex w-[70%] justify-between">
                <button type="button" id="popup-merah"
                    class="mb-2 mr-2 flex inline-flex w-[100%] items-center items-center justify-center rounded-[14px] bg-redDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <p class="text-lg font-bold text-whiteDefault">CALL</p>
                </button>
            </div>
            <div class="flex w-[70%] justify-between">
                <button id="disk-merah" type="button"
                    class="mb-2 mr-2 flex inline-flex w-[100%] items-center items-center justify-center rounded-[14px] bg-redDefault px-5 py-2.5 text-center text-sm shadow-inset-custom disabled:cursor-not-allowed">
                    <p class="text-lg font-bold text-whiteDefault">WMP</p>
                </button>
            </div>
        </div>
    </div>
    <script src="{{ mix('js/scoreUpdate.js') }}"></script>
    <script src="{{ mix('js/scoringDewan.js') }}"></script>
    <script src="{{ mix('js/dropVerification.js') }}"></script>
    <script src="{{ mix('js/wmpConfirmationModal.js') }}"></script>
</body>

</html>
