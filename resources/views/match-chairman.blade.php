<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PENCAK SILAT | {{ $title }}</title>
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <script src="{{ mix('js/app.js') }}"></script>
    <style>
        body {
            font-family: "Poppins";
        }
    </style>
</head>

<body>
    <header>
        <label for="user"></label><input id="user" type="text" hidden="hidden" data-user="{{ $gelanggang }}"
            detail-user="{{ auth()->user() }}">
        <x-winner-modal />

        <div class="flex justify-between uppercase">
            <div>
                <div
                    class="flex justify-start pl-6 w-[200px] 2xl:w-[600px] xl:w-[500px] lg:w-[395px] md:w-[280px] bg-blueDefault py-3 rounded-br-[90px] shadow-inset-custom">
                    <p id="nama_biru" class="font-bold text-whiteDefault text-xl">SUDUT BIRU</p>
                </div>
                <div
                    class="flex justify-start pl-6 w-[150px] xl:w-[300px] lg:w-[250px] md:w-[200px] bg-blueDark py-2 rounded-br-[90px] shadow-inset-custom">
                    <p id="kontingen_biru" class="text-whiteDefault text-base">KONTINGEN</p>
                </div>
            </div>
            <div>
                <div
                    class="flex mx-auto justify-center w-[150px] 2xl:w-[325px] xl:w-[285px] lg:w-[230px] md:w-[205px] bg-grayDefault py-3 rounded-b-[90px] shadow-inset-custom">
                    <p id="babak" class="font-bold text-whiteDefault text-xl">BABAK</p>
                </div>
                <div
                    class="flex mx-auto justify-center w-[100px] 2xl:w-[200px] xl:w-[185px] lg:w-[140px] md:w-[105px] bg-grayDark py-2 rounded-b-[90px] shadow-inset-custom">
                    <p id="round" class="font-bold text-whiteDefault text-base">RONDE</p>
                </div>
            </div>
            <div>
                <div
                    class="flex justify-end pr-6 w-[200px] 2xl:w-[600px] xl:w-[500px] lg:w-[395px] md:w-[280px] sm:w-[200px] bg-redDefault py-3 rounded-bl-[90px] shadow-inset-custom">
                    <p id="nama_merah" class="font-bold text-whiteDefault text-xl">SUDUT MERAH</p>
                </div>
                <div
                    class="flex ml-auto justify-end pr-6 w-[150px] xl:w-[300px] lg:w-[250px] md:w-[200px] bg-redDark py-2 rounded-bl-[90px] shadow-inset-custom">
                    <p id="kontingen_merah" class="text-whiteDefault text-base">KONTINGEN</p>
                </div>
            </div>
        </div>
    </header>


    <!--round 1-->
    <!--round 1-->
    <div class="flex justify-between">
        <!--left side-->
        <div
            class="flex flex-col w-[38%] h-[288px] rounded-[8px] ml-[1%] mt-[5%] border-[1px] border-grayDefault drop-shadow-xl">
            <div class="border-b border-grayDefault bg-blueDefault rounded-t-[7px]">
                <p class="flex justify-center my-2 text-whiteDefault">SUDUT BIRU</p>
            </div>
            <div class="flex bg-blueOpacity rounded-b-[8px]">
                <div class="w-[25%]">
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center text-base h-[40px] ml-[4%]">JURI 1</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">JURI 2</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">JURI 3</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">NILAI</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">JATUHAN</p>
                    </div>
                    <div>
                        <p class="flex items-center h-[40px] ml-[4%]">PELANGGARAN</p>
                    </div>
                </div>
                <div class="w-[75%] border-l border-grayDefault">
                    <div class="border-b border-grayDefault">
                        <p id="round-1-jurror1-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-1-jurror2-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-1-jurror3-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-1-point-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-1-dropping-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div>
                        <p id="round-1-penalty-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                </div>
            </div>
        </div>

        <!--center side-->
        <div class="flex items-center mt-[5%] w-[15%] h-[288px] drop-shadow-xl">
            <div class="flex flex-col w-full h-[190px] rounded-[8px] bg-greenDefault">
                <div class="flex flex-col items-center justify-center border-b-[2px] h-[50%]">
                    <p class="font-bold text-2xl text-whiteDefault">RONDE</p>
                    <p class="font-bold text-2xl text-whiteDefault">1</p>
                </div>
                <div class="flex justify-between w-full h-[50%]">
                    <p id="round-1-board-point-blue"
                        class="flex items-center justify-center w-[50%] border-r-[2px] font-bold text-xl text-whiteDefault">
                        0</p>
                    <p id="round-1-board-point-red"
                        class="flex items-center justify-center w-[50%] font-bold text-xl text-whiteDefault">0</p>
                </div>
            </div>
        </div>

        <!--right side-->
        <div
            class="flex flex-col w-[38%] h-[288px] rounded-[8px] mr-[1%] mt-[5%] border-[1px] border-grayDefault drop-shadow-xl">
            <div class="border-b border-grayDefault bg-redDefault rounded-t-[7px]">
                <p class="flex justify-center my-2 text-whiteDefault">SUDUT MERAH</p>
            </div>
            <div class="flex bg-redOpacity rounded-b-[8px]">
                <div class="w-[75%] border-r border-grayDefault">
                    <div class="border-b border-grayDefault">
                        <p id="round-1-jurror1-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-1-jurror2-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-1-jurror3-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-1-point-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-1-dropping-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div>
                        <p id="round-1-penalty-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                </div>
                <div class="w-[25%]">
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JURI 1</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JURI 2</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JURI 3</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">NILAI</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JATUHAN</p>
                    </div>
                    <div>
                        <p class="flex items-center h-[40px] mr-[4%]">PELANGGARAN</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--round 2-->
    <div class="flex justify-between">
        <!--left side-->
        <div
            class="flex flex-col w-[38%] h-[288px] rounded-[8px] ml-[1%] mt-[1%] border-[1px] border-grayDefault drop-shadow-xl">
            <div class="border-b border-grayDefault bg-blueDefault rounded-t-[7px]">
                <p class="flex justify-center my-2 text-whiteDefault">SUDUT BIRU</p>
            </div>
            <div class="flex bg-blueOpacity rounded-b-[8px]">
                <div class="w-[25%]">
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center text-base h-[40px] ml-[4%]">JURI 1</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">JURI 2</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">JURI 3</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">NILAI</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">JATUHAN</p>
                    </div>
                    <div>
                        <p class="flex items-center h-[40px] ml-[4%]">PELANGGARAN</p>
                    </div>
                </div>
                <div class="w-[75%] border-l border-grayDefault">
                    <div class="border-b border-grayDefault">
                        <p id="round-2-jurror1-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-2-jurror2-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-2-jurror3-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-2-point-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-2-dropping-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div>
                        <p id="round-2-penalty-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                </div>
            </div>
        </div>

        <!--center side-->
        <div class="flex items-center mt-[1%] w-[15%] h-[288px] drop-shadow-xl">
            <div class="flex flex-col w-full h-[190px] rounded-[8px] bg-greenDefault">
                <div class="flex flex-col items-center justify-center border-b-[2px] h-[50%]">
                    <p class="font-bold text-2xl text-whiteDefault">RONDE</p>
                    <p class="font-bold text-2xl text-whiteDefault">2</p>
                </div>
                <div class="flex justify-between w-full h-[50%]">
                    <p id="round-2-board-point-blue"
                        class="flex items-center justify-center w-[50%] border-r-[2px] font-bold text-xl text-whiteDefault">
                        0</p>
                    <p id="round-2-board-point-red"
                        class="flex items-center justify-center w-[50%] font-bold text-xl text-whiteDefault">0</p>
                </div>
            </div>
        </div>

        <!--right side-->
        <div
            class="flex flex-col w-[38%] h-[288px] rounded-[8px] mr-[1%] mt-[1%] border-[1px] border-grayDefault drop-shadow-xl">
            <div class="border-b border-grayDefault bg-redDefault rounded-t-[7px]">
                <p class="flex justify-center my-2 text-whiteDefault">SUDUT MERAH</p>
            </div>
            <div class="flex bg-redOpacity rounded-b-[8px]">
                <div class="w-[75%] border-r border-grayDefault">
                    <div class="border-b border-grayDefault">
                        <p id="round-2-jurror1-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-2-jurror2-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-2-jurror3-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-2-point-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-2-dropping-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div>
                        <p id="round-2-penalty-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                </div>
                <div class="w-[25%]">
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JURI 1</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JURI 2</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JURI 3</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">NILAI</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JATUHAN</p>
                    </div>
                    <div>
                        <p class="flex items-center h-[40px] mr-[4%]">PELANGGARAN</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--round 3-->
    <div class="flex justify-between">
        <!--left side-->
        <div
            class="flex flex-col w-[38%] h-[288px] rounded-[8px] ml-[1%] mt-[1%] border-[1px] border-grayDefault drop-shadow-xl">
            <div class="border-b border-grayDefault bg-blueDefault rounded-t-[7px]">
                <p class="flex justify-center my-2 text-whiteDefault">SUDUT BIRU</p>
            </div>
            <div class="flex bg-blueOpacity rounded-b-[8px]">
                <div class="w-[25%]">
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center text-base h-[40px] ml-[4%]">JURI 1</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">JURI 2</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">JURI 3</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">NILAI</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] ml-[4%]">JATUHAN</p>
                    </div>
                    <div>
                        <p class="flex items-center h-[40px] ml-[4%]">PELANGGARAN</p>
                    </div>
                </div>
                <div class="w-[75%] border-l border-grayDefault">
                    <div class="border-b border-grayDefault">
                        <p id="round-3-jurror1-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-3-jurror2-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-3-jurror3-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-3-point-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-3-dropping-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                    <div>
                        <p id="round-3-penalty-blue" class="flex items-center h-[40px] ml-[2%]"></p>
                    </div>
                </div>
            </div>
        </div>

        <!--center side-->
        <div class="flex items-center mt-[1%] w-[15%] h-[288px] drop-shadow-xl">
            <div class="flex flex-col w-full h-[190px] rounded-[8px] bg-greenDefault">
                <div class="flex flex-col items-center justify-center border-b-[2px] h-[50%]">
                    <p class="font-bold text-2xl text-whiteDefault">RONDE</p>
                    <p class="font-bold text-2xl text-whiteDefault">3</p>
                </div>
                <div class="flex justify-between w-full h-[50%]">
                    <p id="round-3-board-point-blue"
                        class="flex items-center justify-center w-[50%] border-r-[2px] font-bold text-xl text-whiteDefault">
                        0</p>
                    <p id="round-3-board-point-red"
                        class="flex items-center justify-center w-[50%] font-bold text-xl text-whiteDefault">0</p>
                </div>
            </div>
        </div>

        <!--right side-->
        <div
            class="flex flex-col w-[38%] h-[288px] rounded-[8px] mr-[1%] mt-[1%] border-[1px] border-grayDefault drop-shadow-xl">
            <div class="border-b border-grayDefault bg-redDefault rounded-t-[7px]">
                <p class="flex justify-center my-2 text-whiteDefault">SUDUT MERAH</p>
            </div>
            <div class="flex bg-redOpacity rounded-b-[8px]">
                <div class="w-[75%] border-r border-grayDefault">
                    <div class="border-b border-grayDefault">
                        <p id="round-3-jurror1-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-3-jurror2-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-3-jurror3-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-3-point-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p id="round-3-dropping-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                    <div>
                        <p id="round-3-penalty-red" class="flex items-center justify-end h-[40px] mr-[2%]"></p>
                    </div>
                </div>
                <div class="w-[25%]">
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JURI 1</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JURI 2</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JURI 3</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">NILAI</p>
                    </div>
                    <div class="border-b border-grayDefault">
                        <p class="flex items-center h-[40px] mr-[4%]">JATUHAN</p>
                    </div>
                    <div>
                        <p class="flex items-center h-[40px] mr-[4%]">PELANGGARAN</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-4">
        <x-logout-button></x-logout-button>
    </div>

    <script src="{{ mix('js/ketuaPertandingan.js') }}"></script>
</body>

</html>
