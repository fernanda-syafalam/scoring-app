<!DOCTYPE html>
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
    <x-websocket-status />
    <label for="user"></label><input id="user" type="text" hidden="hidden" data-user="{{ $gelanggang }}">
    <label for="partai"></label><input id="partai" type="text" hidden="hidden"
        data-partai="{{ $partai_pertama[0] }}">
    <div class="w-[60rem] h-[24.375rem] relative mx-auto my-auto">
        <div class="mx-auto mt-3">
            <div class="mx-auto flex justify-center space-x-[3.125rem] mt-1">
                <button id="status_dewan" disabled class="w-[12.5rem] border-black border-[1px] h-9 bg-gray-200">
                    DEWAN
                </button>
                <button id="status_ketua" disabled class="w-[12.5rem] border-black border-[1px] h-9 bg-gray-200">
                    KETUA
                </button>
            </div>
            <div class="mx-auto flex justify-center mt-4 space-x-[3.125rem]">
                <button id="status_juri_pertama" disabled class="w-[12.5rem] border-black border-[1px] bg-gray-200 h-9">
                    JURI I
                </button>
                <button id="status_juri_kedua" disabled class="w-[12.5rem] border-black border-[1px] h-9 bg-gray-200">
                    JURI II
                </button>
                <button id="status_juri_ketiga" disabled class="w-[12.5rem] border-black border-[1px] h-9 bg-gray-200">
                    JURI III
                </button>
            </div>
        </div>
        <div class="flex mt-4 justify-between mx-4">
            <div class="flex-row space-y-[2.625rem] my-4 ">
                @if (!empty($partai_pertama[0]))
                    <div class="flex space-x-3">
                        <span class="flex justify-center items-center w-16 h-16 border-[2px] border-black font-bold">
                            {{ $partai_pertama[0]->id }} {{ $partai_pertama[0]->kelas }}
                        </span>
                        <div class="flex-row space-y-2">
                            <span id="kontingen_peserta_sudut_merah"
                                class="flex justify-center items-center w-48 h-7 font-bold text-white bg-redDark">
                                {{ $partai_pertama[0]->sudut_merah }}
                            </span>
                            <span id="kontingen_peserta_sudut_merah"
                                class="flex justify-center items-center w-48 h-7 font-bold text-black border-black border-[2px] ">
                                {{ $partai_pertama[0]->contingen_sudut_merah }}
                            </span>
                        </div>
                    </div>
                @endif
                @if (!empty($partai_kedua[0]))
                    <div class="flex space-x-3">
                        <span class="flex justify-center items-center w-16 h-16 border-[2px] border-black font-bold">
                            {{ $partai_kedua[0]->id }} {{ $partai_kedua[0]->kelas }}
                        </span>
                        <div class="flex-row space-y-2">
                            <span class="flex justify-center items-center w-48 h-7 font-bold text-white bg-redDark">
                                {{ $partai_kedua[0]->sudut_merah }}
                            </span>
                            <span
                                class="flex justify-center items-center w-48 h-7 font-bold text-black border-black border-[2px] ">
                                {{ $partai_kedua[0]->contingen_sudut_merah }}
                            </span>
                        </div>
                    </div>
                @endif
            </div>
            <div class="flex flex-col space-y-[0.875rem]">
                <button id="round-1" disabled
                    class="w-36 h-14  bg-grayDefault border-[2px] border-black font-medium cursor-pointer disabled:cursor-not-allowed">
                    RONDE I
                </button>
                <button id="round-2" disabled
                    class="w-36 h-14 bg-grayDefault border-[2px] border-black font-medium cursor-pointer disabled:cursor-not-allowed">
                    RONDE II
                </button>
                <button id="round-3" disabled
                    class="w-36 h-14 bg-grayDefault border-[2px] border-black font-medium cursor-pointer disabled:cursor-not-allowed">
                    RONDE III
                </button>
            </div>
            <div class="flex-row space-y-[2.625rem] my-4">
                @if (!empty($partai_pertama[0]))
                    <div class="flex space-x-3">
                        <div class="flex-row space-y-2">
                            <span id="nama_peserta_sudut_biru"
                                class="flex justify-center items-center w-48 h-7 font-bold text-white bg-blueDark">
                                {{ $partai_pertama[0]->sudut_biru }}
                            </span>
                            <span id="kontingen_peserta_sudut_biru"
                                class="flex justify-center items-center w-48 h-7 font-bold text-black border-black border-[2px] ">
                                {{ $partai_pertama[0]->contingen_sudut_biru }}
                            </span>
                        </div>
                        <span class="flex justify-center items-center w-16 h-16 border-[2px] border-black font-bold">
                            {{ $partai_pertama[0]->id }} {{ $partai_pertama[0]->kelas }}
                        </span>
                    </div>
                @endif
                @if (!empty($partai_kedua[0]))
                    <div class="flex space-x-3">
                        <div class="flex-row space-y-2">
                            <span class="flex justify-center items-center w-48 h-7 font-bold text-white bg-blueDark">
                                {{ $partai_kedua[0]->sudut_biru }}
                            </span>
                            <span
                                class="flex justify-center items-center w-48 h-7 font-bold text-black border-black border-[2px] ">
                                {{ $partai_kedua[0]->contingen_sudut_biru }}
                            </span>
                        </div>
                        <span class="flex justify-center items-center w-16 h-16 border-[2px] border-black font-bold">
                            {{ $partai_kedua[0]->id }} {{ $partai_kedua[0]->kelas }}
                        </span>
                    </div>
                @endif
            </div>
        </div>
        <div class="flex justify-between mx-auto  mt-6">
            <select id="time" name="role_id"
                class="w-26 h-10 border-[2px] text-center align-middle border-black disabled:cursor-not-allowed cursor-pointer">
                <option value="satu">01:30</option>
                <option selected value="dua">02:00</option>
                <option value="tiga">02:30</option>
                <option value="empat">03:00</option>
            </select>
            <button id="start" {{ empty($partai_pertama[0]) ? 'disabled' : '' }}
                class="w-24 h-10 border-[2px] border-black disabled:cursor-not-allowed">
                HIDUPKAN
            </button>
            <button id="pause" disabled class="w-24 h-10 border-[2px] border-black disabled:cursor-not-allowed">
                MULAI
            </button>
            <button id="finish" disabled class="w-24 h-10 border-[2px] border-black disabled:cursor-not-allowed">
                AKHIRI
            </button>
            <a href="{{ $partai_pertama->previousPageUrl() }}">
                <button id="prev" class="w-24 h-10 border-[2px] border-black disabled:cursor-not-allowed">
                    KEMBALI
                </button>
            </a>
            <a href="{{ $partai_pertama->nextPageUrl() }}">
                <button id="next" class="w-24 h-10 border-[2px] border-black disabled:cursor-not-allowed">
                    LANJUT
                </button>
            </a>
            <button id="segarkan" class="w-24 h-10 border-[2px] border-black disabled:cursor-not-allowed">
                SEGARKAN
            </button>
            <button id="kunci" class="w-24 h-10 border-[2px] border-black disabled:cursor-not-allowed">
                BATAL
            </button>
        </div>
        <div class="mt-16">
            <x-logout-button></x-logout-button>
        </div>
    </div>
    <script src="{{ mix('js/operator.js') }}"></script>
</body>

</html>
