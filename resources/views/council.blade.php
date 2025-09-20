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
</head>

<body class="font-poppins">
    <header>
        <label for="user"></label><input id="user" type="text" hidden="hidden"
            data-user="{{ $gelangang }}" detail-user="{{ auth()->user() }}">
        <x-winner-modal />

        <div class="flex justify-between">
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
        <x-drop-verification-result />
    </header>
    <s class="text-whiteDefault">1</s>
    <div class="flex justify-between">
        <div class="w-full flex mt-[5%]">
            <div id="round-1-blueInput-div"
                class="bg-blueDefault py-3 w-[70%] rounded-r-[20px] pl-6 shadow-inset-custom">
                <p id="round-1-blueInput" class="text-whiteDefault"></p>
            </div>
            <div id="round-1-blueScore-div"
                class="flex items-center justify-center w-[54px] h-[54px] bg-blueDefault rounded-full ml-[2%] shadow-inset-custom">
                <p id="round-1-blueScore" class="text-whiteDefault">0</p>
            </div>
        </div>
        <div class="w-full flex mt-[5%] justify-end">
            <div id="round-1-redScore-div"
                class="flex items-center justify-center w-[54px] h-[54px] bg-redDefault rounded-full mr-[2%] shadow-inset-custom">
                <p id="round-1-redScore" class="text-whiteDefault">0</p>
            </div>
            <div id="round-1-redInput-div" class="bg-redDefault py-3 w-[70%] rounded-l-[20px] pr-6 shadow-inset-custom">
                <p id="round-1-redInput" class="text-whiteDefault text-right"></p>
            </div>
        </div>
    </div>
    <div class="flex justify-between">
        <div class="w-full flex mt-[2%]">
            <div id="round-2-blueInput-div" class="bg-grayDefault py-3 w-[70%] rounded-r-[20px] pl-6">
                <p id="round-2-blueInput" class="text-whiteDefault"></p>
            </div>
            <div id="round-2-blueScore-div"
                class="flex items-center justify-center w-[54px] h-[54px] bg-grayDefault rounded-full ml-[2%]">
                <p id="round-2-blueScore" class="text-whiteDefault"></p>
                <p id="round-2-blueScore" class="text-whiteDefault"></p>
            </div>
        </div>
        <div class="w-full flex mt-[2%] justify-end">
            <div id="round-2-redScore-div"
                class="flex items-center justify-center w-[54px] h-[54px] bg-grayDefault rounded-full mr-[2%]">
                <p id="round-2-redScore" class="text-whiteDefault"></p>
            </div>
            <div id="round-2-redInput-div" class="bg-grayDefault py-3 w-[70%] rounded-l-[20px] pr-6">
                <p id="round-2-redInput" class="text-whiteDefault text-right"></p>
            </div>
        </div>
    </div>
    <div class="flex justify-between">
        <div class="w-full flex mt-[2%]">
            <div id="round-3-blueInput-div" class="bg-grayDefault py-3 w-[70%] rounded-r-[20px] pl-6">
                <p id="round-3-blueInput" class="text-whiteDefault"></p>
            </div>
            <div id="round-3-blueScore-div"
                class="flex items-center justify-center w-[54px] h-[54px] bg-grayDefault rounded-full ml-[2%]">
                <p id="round-3-blueScore" class="text-whiteDefault"></p>
            </div>
        </div>
        <div class="w-full flex mt-[2%] justify-end">
            <div id="round-3-redScore-div"
                class="flex items-center justify-center w-[54px] h-[54px] bg-grayDefault rounded-full mr-[2%]">
                <p id="round-3-redScore" class="text-whiteDefault"></p>
            </div>
            <div id="round-3-redInput-div" class="bg-grayDefault py-3 w-[70%] rounded-l-[20px] pr-6">
                <p id="round-3-redInput" class="text-whiteDefault text-right"></p>
            </div>
        </div>
    </div>

    <div class="flex justify-between mt-[3%] ml-[1%] mr-[2%]">
        <!--left side-->
        <div class="flex flex-col justify-start w-[50%]">
            <div class="flex justify-between w-[70%]">
                <button type="button" id="binaan-biru-pertama"
                    class="shadow-inset-custom focus-red-button flex justify-center items-center w-[25%] bg-grayDefault disabled:cursor-not-allowed  rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="47" viewBox="0 0 45 47"
                        fill="none">
                        <path
                            d="M23.6406 14.708L18.735 10.7835C18.0497 10.2352 17.2062 9.95971 16.3506 10.0048C15.495 10.0498 14.681 10.4126 14.0497 11.0303L6.47095 18.4406C5.71271 19.1808 5.28126 20.2266 5.28126 21.3252L5.28126 30.3747C5.28126 35.0747 8.95314 38.208 12.625 38.208L28.3608 38.208C32.5578 38.208 32.5578 32.333 28.3608 32.333L27.3125 32.333"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M27.3125 32.333L30.4593 32.333C34.6562 32.333 34.6562 26.458 30.4593 26.458L27.3125 26.458L31.9023 26.458C36.0993 26.458 36.0993 20.583 31.9023 20.583L27.3125 20.583L39.2479 20.583C39.978 20.5825 40.678 20.2728 41.194 19.7219C41.7101 19.1711 42 18.4242 42 17.6455C42 16.8664 41.7099 16.1193 41.1934 15.5684C40.6769 15.0175 39.9765 14.708 39.2461 14.708L18.1328 14.708"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" id="teguran-biru-pertama"
                    class="shadow-inset-custom focus-red-button flex justify-center items-center w-[25%] bg-grayDefault disabled:cursor-not-allowed  rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45"
                        fill="none">
                        <path
                            d="M14.708 21.8679L10.7835 26.7735C10.2352 27.4588 9.95971 28.3023 10.0048 29.1579C10.0498 30.0136 10.4126 30.8275 11.0303 31.4588L18.4406 39.0376C19.1808 39.7958 20.2266 40.2273 21.3252 40.2273H30.3747C35.0747 40.2273 38.208 36.5554 38.208 32.8835L38.208 17.1477C38.208 12.9508 32.333 12.9508 32.333 17.1477L32.333 18.196"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M32.333 18.1562L32.333 15.0095C32.333 10.8125 26.458 10.8125 26.458 15.0095L26.458 18.1562L26.458 13.5664C26.458 9.36945 20.583 9.36945 20.583 13.5664L20.583 18.1562L20.583 6.22082C20.5825 5.49076 20.2728 4.79076 19.7219 4.2747C19.1711 3.75864 18.4242 3.46875 17.6455 3.46875C16.8664 3.46875 16.1193 3.75889 15.5684 4.27535C15.0175 4.79181 14.708 5.49227 14.708 6.22266L14.708 27.3359"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" id="peringatan-biru-pertama"
                    class="shadow-inset-custom focus-red-button flex justify-center items-center w-[50%] bg-grayDefault disabled:cursor-not-allowed  rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45"
                        fill="none">
                        <path
                            d="M14.708 21.8679L10.7835 26.7735C10.2352 27.4588 9.95971 28.3023 10.0048 29.1579C10.0498 30.0136 10.4126 30.8275 11.0303 31.4588L18.4406 39.0376C19.1808 39.7958 20.2266 40.2273 21.3252 40.2273H30.3747C35.0747 40.2273 38.208 36.5554 38.208 32.8835L38.208 17.1477C38.208 12.9508 32.333 12.9508 32.333 17.1477L32.333 18.196"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M32.333 18.1562L32.333 15.0095C32.333 10.8125 26.458 10.8125 26.458 15.0095L26.458 18.1562L26.458 13.5664C26.458 9.36945 20.583 9.36945 20.583 13.5664L20.583 18.1562L20.583 6.22082C20.5825 5.49076 20.2728 4.79076 19.7219 4.2747C19.1711 3.75864 18.4242 3.46875 17.6455 3.46875C16.8664 3.46875 16.1193 3.75889 15.5684 4.27535C15.0175 4.79181 14.708 5.49227 14.708 6.22266L14.708 27.3359"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45"
                        fill="none">
                        <path
                            d="M14.708 21.8679L10.7835 26.7735C10.2352 27.4588 9.95971 28.3023 10.0048 29.1579C10.0498 30.0136 10.4126 30.8275 11.0303 31.4588L18.4406 39.0376C19.1808 39.7958 20.2266 40.2273 21.3252 40.2273H30.3747C35.0747 40.2273 38.208 36.5554 38.208 32.8835L38.208 17.1477C38.208 12.9508 32.333 12.9508 32.333 17.1477L32.333 18.196"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M32.333 18.1562L32.333 15.0095C32.333 10.8125 26.458 10.8125 26.458 15.0095L26.458 18.1562L26.458 13.5664C26.458 9.36945 20.583 9.36945 20.583 13.5664L20.583 18.1562L20.583 6.22082C20.5825 5.49076 20.2728 4.79076 19.7219 4.2747C19.1711 3.75864 18.4242 3.46875 17.6455 3.46875C16.8664 3.46875 16.1193 3.75889 15.5684 4.27535C15.0175 4.79181 14.708 5.49227 14.708 6.22266L14.708 27.3359"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <div class="flex justify-between w-[70%]">
                <button type="button" id="binaan-biru-kedua"
                    class="shadow-inset-custom flex justify-center items-center w-[25%] bg-grayDefault disabled:cursor-not-allowed  rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="47" viewBox="0 0 45 47"
                        fill="none">
                        <path
                            d="M20.0474 12.3038C18.9717 10.629 17.1915 9.7915 14.7068 9.7915C10.9798 9.7915 4.60919 14.6631 4.60919 19.0562C4.60919 23.4492 4.60919 25.9969 4.60919 30.2967C4.60919 34.5965 8.14392 37.2082 10.9798 37.2082C14.9733 37.2082 18.9668 37.2082 22.9602 37.2082C24.4812 37.2082 25.7141 35.893 25.7141 34.2707L25.7141 34.2618C25.7141 32.6444 24.4849 31.3332 22.9686 31.3332"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M17.9702 13.6895L34.8969 13.6895C36.4167 13.6895 37.6486 15.0035 37.6486 16.6245C37.6486 16.6272 37.6486 16.63 37.6486 16.6326C37.6444 18.2594 36.4068 19.5759 34.8817 19.5759L22.4253 19.5759"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M22.9688 19.8281L38.5676 19.8281C40.0964 19.8281 41.3358 21.1501 41.3358 22.7808C41.3358 24.4115 40.0964 25.7334 38.5676 25.7334L22.9688 25.7334"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M23.2296 25.458L25.7195 25.458C27.2404 25.458 28.4734 26.7731 28.4734 28.3955C28.4734 30.0179 27.2404 31.333 25.7195 31.333L22.9656 31.333"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" id="teguran-biru-kedua"
                    class="shadow-inset-custom flex justify-center items-center w-[25%] bg-grayDefault disabled:cursor-not-allowed  rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45"
                        fill="none">
                        <path
                            d="M12.304 24.9524C10.6292 26.028 9.79169 27.8082 9.79169 30.2929C9.79169 34.02 14.6633 40.3906 19.0564 40.3906C23.4494 40.3906 25.9971 40.3906 30.2969 40.3906C34.5967 40.3906 37.2083 36.8558 37.2083 34.02C37.2083 30.0264 37.2083 26.033 37.2083 22.0396C37.2083 20.5186 35.8932 19.2856 34.2708 19.2856H34.2619C32.6445 19.2856 31.3333 20.5149 31.3333 22.0312"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M13.6898 27.0295L13.6898 10.1028C13.6898 8.58304 15.0038 7.35107 16.6248 7.35107C16.6276 7.35107 16.6303 7.35107 16.6329 7.35108C18.2597 7.35531 19.5762 8.59287 19.5762 10.118L19.5762 22.5744"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M19.8284 22.0311L19.8284 6.43219C19.8284 4.90339 21.1503 3.66406 22.781 3.66406C24.4118 3.66406 25.7336 4.90339 25.7336 6.43219L25.7336 22.0311"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M25.4584 21.7702L25.4584 19.2803C25.4584 17.7594 26.7735 16.5264 28.3959 16.5264C30.0183 16.5264 31.3334 17.7594 31.3334 19.2803L31.3334 22.0342"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" id="peringatan-biru-kedua"
                    class="shadow-inset-custom flex justify-center items-center w-[50%] bg-grayDefault disabled:cursor-not-allowed  rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45"
                        fill="none">
                        <path
                            d="M12.304 24.9524C10.6291 26.028 9.79166 27.8082 9.79166 30.2929C9.79166 34.02 14.6633 40.3906 19.0563 40.3906C23.4494 40.3906 25.9971 40.3906 30.2969 40.3906C34.5967 40.3906 37.2083 36.8558 37.2083 34.02C37.2083 30.0264 37.2083 26.033 37.2083 22.0396C37.2083 20.5186 35.8932 19.2856 34.2708 19.2856H34.2619C32.6445 19.2856 31.3333 20.5149 31.3333 22.0312"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M13.6897 27.0295L13.6897 10.1028C13.6897 8.58304 15.0038 7.35107 16.6248 7.35107C16.6275 7.35107 16.6303 7.35107 16.6329 7.35108C18.2597 7.35531 19.5762 8.59287 19.5762 10.118L19.5762 22.5744"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M19.8283 22.0311L19.8283 6.43219C19.8283 4.90339 21.1503 3.66406 22.781 3.66406C24.4117 3.66406 25.7336 4.90339 25.7336 6.43219L25.7336 22.0311"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M25.4583 21.7702L25.4583 19.2803C25.4583 17.7594 26.7734 16.5264 28.3958 16.5264C30.0182 16.5264 31.3333 17.7594 31.3333 19.2803L31.3333 22.0342"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45"
                        fill="none">
                        <path
                            d="M12.304 24.9524C10.6291 26.028 9.79166 27.8082 9.79166 30.2929C9.79166 34.02 14.6633 40.3906 19.0563 40.3906C23.4494 40.3906 25.9971 40.3906 30.2969 40.3906C34.5967 40.3906 37.2083 36.8558 37.2083 34.02C37.2083 30.0264 37.2083 26.033 37.2083 22.0396C37.2083 20.5186 35.8932 19.2856 34.2708 19.2856H34.2619C32.6445 19.2856 31.3333 20.5149 31.3333 22.0312"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M13.6897 27.0295L13.6897 10.1028C13.6897 8.58304 15.0038 7.35107 16.6248 7.35107C16.6275 7.35107 16.6303 7.35107 16.6329 7.35108C18.2597 7.35531 19.5762 8.59287 19.5762 10.118L19.5762 22.5744"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M19.8283 22.0311L19.8283 6.43219C19.8283 4.90339 21.1503 3.66406 22.781 3.66406C24.4117 3.66406 25.7336 4.90339 25.7336 6.43219L25.7336 22.0311"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M25.4583 21.7702L25.4583 19.2803C25.4583 17.7594 26.7734 16.5264 28.3958 16.5264C30.0182 16.5264 31.3333 17.7594 31.3333 19.2803L31.3333 22.0342"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <div class="flex justify-between w-[70%]">
                <button type="button" id="jatuhan-biru-plus"
                    class="shadow-inset-custom flex justify-center items-center w-[25%] bg-blueDefault disabled:cursor-not-allowed   rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <p class="font-bold text-whiteDefault text-lg">JATUHAN +</p>
                </button>
                <button type="button" id="jatuhan-biru-minus"
                    class="shadow-inset-custom flex justify-center items-center w-[25%] bg-blueDefault disabled:cursor-not-allowed   rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <p class="font-bold text-whiteDefault text-lg">JATUHAN -</p>
                </button>
                <button type="button" id="peringatan-biru-ketiga"
                    class="shadow-inset-custom flex justify-center items-center w-[50%] bg-grayDefault disabled:cursor-not-allowed  rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="44" viewBox="0 0 48 44"
                        fill="none">
                        <path
                            d="M32 23.8333V8.25C32 7.52065 31.6839 6.82118 31.1213 6.30546C30.5587 5.78973 29.7956 5.5 29 5.5C28.2044 5.5 27.4413 5.78973 26.8787 6.30546C26.3161 6.82118 26 7.52065 26 8.25V22"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M14 21.083C14 20.3537 13.6839 19.6542 13.1213 19.1385C12.5587 18.6227 11.7956 18.333 11 18.333C10.2044 18.333 9.44129 18.6227 8.87868 19.1385C8.31607 19.6542 8 20.3537 8 21.083V29.333C8 32.2504 9.26428 35.0483 11.5147 37.1112C13.7652 39.1741 16.8174 40.333 20 40.333H24H23.584C25.5713 40.3333 27.5276 39.8812 29.2772 39.0172C31.0268 38.1532 32.515 36.9044 33.608 35.383C33.7392 35.2 33.8698 35.0166 34 34.833C34.624 33.9548 36.814 30.455 40.572 24.3317C40.9551 23.7075 41.0574 22.9709 40.8572 22.2786C40.657 21.5863 40.1701 20.9929 39.5 20.6247C38.7862 20.2321 37.9499 20.0694 37.1237 20.1624C36.2975 20.2554 35.5289 20.5988 34.94 21.138L32 23.833"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M26 10.0832V6.4165C26 6.05537 25.9224 5.69777 25.7716 5.36412C25.6209 5.03048 25.3999 4.72732 25.1213 4.47196C24.8427 4.2166 24.512 4.01404 24.1481 3.87583C23.7841 3.73763 23.394 3.6665 23 3.6665C22.606 3.6665 22.2159 3.73763 21.8519 3.87583C21.488 4.01404 21.1573 4.2166 20.8787 4.47196C20.6001 4.72732 20.3791 5.03048 20.2284 5.36412C20.0776 5.69777 20 6.05537 20 6.4165V21.9998M20 10.0832C20 9.35383 19.6839 8.65435 19.1213 8.13863C18.5587 7.6229 17.7956 7.33317 17 7.33317C16.2044 7.33317 15.4413 7.6229 14.8787 8.13863C14.3161 8.65435 14 9.35383 14 10.0832V21.9998"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <div class="flex justify-between w-[70%]">
                <button type="button" id="disk-biru"
                    class="shadow-inset-custom focus-red-button flex justify-center items-center w-[100%] bg-blueDefault  rounded-[14px] text-sm px-5 disabled:cursor-not-allowed  py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <p class="font-bold text-whiteDefault text-lg">DISKULIFIKASI</p>
                </button>
            </div>
            <div class="flex justify-between w-[70%]">
                <button type="button" id="popup-biru"
                    class="shadow-inset-custom flex justify-center items-center w-[100%] bg-blueDefault hover:bg-blueDefault  rounded-[14px] text-sm px-5 py-2.5 disabled:cursor-not-allowed  text-center inline-flex items-center mr-2 mb-2">
                    <p class="font-bold text-whiteDefault text-lg">MULAI PENGAMBILAN KEPUTUSAN</p>
                </button>
            </div>
        </div>

        <x-logout-button></x-logout-button>

        <!--right side-->
        <div class="flex flex-col justify-start items-end w-[50%]">
            <div class="flex justify-between w-[70%]">
                <button type="button" id="peringatan-merah-pertama"
                    class="shadow-inset-custom flex justify-center items-center w-[50%] bg-grayDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="44" viewBox="0 0 47 44"
                        fill="none">
                        <path
                            d="M32.292 21.3289L36.2165 26.2276C36.7648 26.9119 37.0403 27.7542 36.9952 28.6086C36.9502 29.463 36.5874 30.2758 35.9697 30.9063L28.5594 38.4743C27.8192 39.2314 26.7734 39.6623 25.6748 39.6623H16.6253C11.9253 39.6623 8.79199 35.9956 8.79199 32.3289L8.79199 16.6154C8.79199 12.4244 14.667 12.4244 14.667 16.6154L14.667 17.6623"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M14.667 17.6623L14.667 14.5199C14.667 10.3289 20.542 10.3289 20.542 14.5199L20.542 17.6623L20.542 13.0789C20.542 8.88794 26.417 8.88794 26.417 13.0789L26.417 17.6623L26.417 5.74377C26.4175 5.01474 26.7272 4.31574 27.2781 3.80041C27.8289 3.28509 28.5758 2.99561 29.3545 2.99561C30.1336 2.99561 30.8807 3.28534 31.4316 3.80106C31.9825 4.31679 32.292 5.01626 32.292 5.74561L32.292 26.8289"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="44" viewBox="0 0 47 44"
                        fill="none">
                        <path
                            d="M32.292 21.3289L36.2165 26.2276C36.7648 26.9119 37.0403 27.7542 36.9952 28.6086C36.9502 29.463 36.5874 30.2758 35.9697 30.9063L28.5594 38.4743C27.8192 39.2314 26.7734 39.6623 25.6748 39.6623H16.6253C11.9253 39.6623 8.79199 35.9956 8.79199 32.3289L8.79199 16.6154C8.79199 12.4244 14.667 12.4244 14.667 16.6154L14.667 17.6623"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M14.667 17.6623L14.667 14.5199C14.667 10.3289 20.542 10.3289 20.542 14.5199L20.542 17.6623L20.542 13.0789C20.542 8.88794 26.417 8.88794 26.417 13.0789L26.417 17.6623L26.417 5.74377C26.4175 5.01474 26.7272 4.31574 27.2781 3.80041C27.8289 3.28509 28.5758 2.99561 29.3545 2.99561C30.1336 2.99561 30.8807 3.28534 31.4316 3.80106C31.9825 4.31679 32.292 5.01626 32.292 5.74561L32.292 26.8289"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" id="teguran-merah-pertama"
                    class="shadow-inset-custom flex justify-center items-center w-[25%] bg-grayDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="45" viewBox="0 0 47 45"
                        fill="none">
                        <path
                            d="M32.292 21.8141L36.2165 26.8241C36.7648 27.524 37.0403 28.3854 36.9952 29.2593C36.9502 30.1331 36.5874 30.9644 35.9697 31.6091L28.5594 39.3491C27.8192 40.1235 26.7734 40.5641 25.6748 40.5641H16.6253C11.9253 40.5641 8.79199 36.8141 8.79199 33.0641L8.79199 16.9935C8.79199 12.7072 14.667 12.7072 14.667 16.9935L14.667 18.0641"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M14.667 18.064L14.667 14.8502C14.667 10.564 20.542 10.564 20.542 14.8502L20.542 18.064L20.542 13.3765C20.542 9.09022 26.417 9.09022 26.417 13.3765L26.417 18.064L26.417 5.87459C26.4175 5.12899 26.7272 4.4141 27.2781 3.88706C27.8289 3.36002 28.5758 3.06396 29.3545 3.06396C30.1336 3.06396 30.8807 3.36028 31.4316 3.88773C31.9825 4.41517 32.292 5.13054 32.292 5.87647L32.292 27.439"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" id="binaan-merah-pertama"
                    class="shadow-inset-custom flex justify-center items-center w-[25%] bg-grayDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="47" viewBox="0 0 43 47"
                        fill="none">
                        <path
                            d="M20.8443 14.708L25.6317 10.7835C26.3004 10.2352 27.1236 9.95971 27.9586 10.0048C28.7936 10.0498 29.5879 10.4126 30.204 11.0303L37.6 18.4406C38.3399 19.1808 38.761 20.2266 38.761 21.3252L38.761 30.3747C38.761 35.0747 35.1777 38.208 31.5943 38.208L16.238 38.208C12.1422 38.208 12.1422 32.333 16.238 32.333L17.261 32.333"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M17.261 32.333L14.1901 32.333C10.0943 32.333 10.0943 26.458 14.1901 26.458L17.261 26.458L12.7818 26.458C8.68609 26.458 8.68609 20.583 12.7818 20.583L17.261 20.583L5.61338 20.583C4.90092 20.5825 4.21781 20.2728 3.71419 19.7219C3.21057 19.1711 2.92767 18.4242 2.92767 17.6455C2.92767 16.8664 3.21082 16.1193 3.71482 15.5684C4.21883 15.0175 4.9024 14.708 5.61517 14.708L26.2193 14.708"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <div class="flex justify-between w-[70%]">
                <button type="button" id="peringatan-merah-kedua"
                    class="shadow-inset-custom flex justify-center items-center w-[50%] bg-grayDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="44" viewBox="0 0 47 44"
                        fill="none">
                        <path
                            d="M34.696 24.9175C36.3708 25.9916 37.2083 27.7693 37.2083 30.2504C37.2083 33.9722 32.3367 40.3338 27.9437 40.3338C23.5506 40.3338 21.0029 40.3338 16.7031 40.3338C12.4033 40.3338 9.79167 36.8041 9.79167 33.9722C9.79167 29.9843 9.79167 25.9966 9.79167 22.0088C9.79167 20.49 11.1068 19.2588 12.7292 19.2588H12.7381C14.3555 19.2588 15.6667 20.4863 15.6667 22.0004"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M33.3103 26.9913L33.3103 10.0886C33.3103 8.57104 31.9962 7.34082 30.3752 7.34082C30.3725 7.34082 30.3697 7.34082 30.3671 7.34083C28.7403 7.34505 27.4238 8.58085 27.4238 10.1038L27.4238 22.5425"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M27.1716 22.0001L27.1716 6.42338C27.1716 4.89675 25.8497 3.65918 24.219 3.65918C22.5882 3.65918 21.2664 4.89675 21.2664 6.42338L21.2664 22.0001"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M21.5417 21.7398L21.5417 19.2534C21.5417 17.7347 20.2265 16.5034 18.6042 16.5034C16.9818 16.5034 15.6667 17.7347 15.6667 19.2534L15.6667 22.0034"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="44" viewBox="0 0 47 44"
                        fill="none">
                        <path
                            d="M34.696 24.9175C36.3708 25.9916 37.2083 27.7693 37.2083 30.2504C37.2083 33.9722 32.3367 40.3338 27.9437 40.3338C23.5506 40.3338 21.0029 40.3338 16.7031 40.3338C12.4033 40.3338 9.79167 36.8041 9.79167 33.9722C9.79167 29.9843 9.79167 25.9966 9.79167 22.0088C9.79167 20.49 11.1068 19.2588 12.7292 19.2588H12.7381C14.3555 19.2588 15.6667 20.4863 15.6667 22.0004"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M33.3103 26.9913L33.3103 10.0886C33.3103 8.57104 31.9962 7.34082 30.3752 7.34082C30.3725 7.34082 30.3697 7.34082 30.3671 7.34083C28.7403 7.34505 27.4238 8.58085 27.4238 10.1038L27.4238 22.5425"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M27.1716 22.0001L27.1716 6.42338C27.1716 4.89675 25.8497 3.65918 24.219 3.65918C22.5882 3.65918 21.2664 4.89675 21.2664 6.42338L21.2664 22.0001"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M21.5417 21.7398L21.5417 19.2534C21.5417 17.7347 20.2265 16.5034 18.6042 16.5034C16.9818 16.5034 15.6667 17.7347 15.6667 19.2534L15.6667 22.0034"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" id="teguran-merah-kedua"
                    class="shadow-inset-custom flex justify-center items-center w-[25%] bg-grayDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="44" viewBox="0 0 47 44"
                        fill="none">
                        <path
                            d="M34.696 24.9175C36.3709 25.9916 37.2083 27.7693 37.2083 30.2504C37.2083 33.9722 32.3367 40.3338 27.9437 40.3338C23.5506 40.3338 21.0029 40.3338 16.7031 40.3338C12.4033 40.3338 9.79168 36.8041 9.79168 33.9722C9.79168 29.9843 9.79168 25.9966 9.79168 22.0088C9.79168 20.49 11.1068 19.2588 12.7292 19.2588H12.7381C14.3555 19.2588 15.6667 20.4863 15.6667 22.0004"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M33.3103 26.9913L33.3103 10.0886C33.3103 8.57104 31.9962 7.34082 30.3752 7.34082C30.3725 7.34082 30.3697 7.34082 30.3671 7.34083C28.7403 7.34505 27.4238 8.58085 27.4238 10.1038L27.4238 22.5425"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M27.1717 22.0001L27.1717 6.42338C27.1717 4.89675 25.8497 3.65918 24.219 3.65918C22.5883 3.65918 21.2664 4.89675 21.2664 6.42338L21.2664 22.0001"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M21.5417 21.7398L21.5417 19.2534C21.5417 17.7347 20.2266 16.5034 18.6042 16.5034C16.9818 16.5034 15.6667 17.7347 15.6667 19.2534L15.6667 22.0034"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" id="binaan-merah-kedua"
                    class="shadow-inset-custom flex justify-center items-center w-[25%] bg-grayDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="47" viewBox="0 0 43 47"
                        fill="none">
                        <path
                            d="M24.3509 12.3038C25.4007 10.629 27.138 9.7915 29.5627 9.7915C33.1999 9.7915 39.4169 14.6631 39.4169 19.0562C39.4169 23.4492 39.4169 25.9969 39.4169 30.2967C39.4169 34.5965 35.9674 37.2082 33.1999 37.2082C29.3026 37.2082 25.4055 37.2082 21.5084 37.2082C20.0241 37.2082 18.8209 35.893 18.8209 34.2707L18.8209 34.2618C18.8209 32.6444 20.0205 31.3332 21.5002 31.3332"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M26.378 13.6895L9.85948 13.6895C8.3764 13.6895 7.17413 15.0035 7.17413 16.6245C7.17413 16.6272 7.17413 16.63 7.17414 16.6326C7.17826 18.2594 8.38598 19.5759 9.87435 19.5759L22.0304 19.5759"
                            stroke="white" stroke-width="3" stroke-linecap="round" />
                        <path
                            d="M21.5 19.8281L6.2773 19.8281C4.78537 19.8281 3.57593 21.1501 3.57593 22.7808C3.57593 24.4115 4.78537 25.7334 6.2773 25.7334L21.5 25.7334"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M21.2454 25.458L18.8156 25.458C17.3313 25.458 16.1281 26.7731 16.1281 28.3955C16.1281 30.0179 17.3313 31.333 18.8156 31.333L21.5031 31.333"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <div class="flex justify-between w-[70%]">
                <button type="button" id="peringatan-merah-ketiga"
                    class="shadow-inset-custom flex justify-center items-center w-[50%] bg-grayDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="44" viewBox="0 0 47 44"
                        fill="none">
                        <path
                            d="M15.6667 23.8333V8.25C15.6667 7.52065 15.9761 6.82118 16.527 6.30546C17.0779 5.78973 17.8251 5.5 18.6042 5.5C19.3832 5.5 20.1304 5.78973 20.6813 6.30546C21.2322 6.82118 21.5417 7.52065 21.5417 8.25V22"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M33.2917 21.083C33.2917 20.3537 33.6011 19.6542 34.152 19.1385C34.7029 18.6227 35.4501 18.333 36.2292 18.333C37.0082 18.333 37.7554 18.6227 38.3063 19.1385C38.8572 19.6542 39.1667 20.3537 39.1667 21.083V29.333C39.1667 32.2504 37.9287 35.0483 35.7252 37.1112C33.5216 39.1741 30.533 40.333 27.4167 40.333H23.5H23.9073C21.9614 40.3333 20.0459 39.8812 18.3327 39.0172C16.6195 38.1532 15.1624 36.9044 14.0922 35.383C13.9637 35.2 13.8358 35.0166 13.7083 34.833C13.0973 33.9548 10.953 30.455 7.27324 24.3317C6.89812 23.7075 6.79792 22.9709 6.99395 22.2786C7.18998 21.5863 7.66677 20.9929 8.32291 20.6247C9.02179 20.2321 9.84076 20.0694 10.6497 20.1624C11.4587 20.2554 12.2113 20.5988 12.7879 21.138L15.6667 23.833"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M21.5417 10.0832V6.4165C21.5417 6.05537 21.6176 5.69777 21.7653 5.36412C21.9129 5.03048 22.1293 4.72732 22.402 4.47196C22.6748 4.2166 22.9986 4.01404 23.355 3.87583C23.7114 3.73763 24.0934 3.6665 24.4792 3.6665C24.8649 3.6665 25.2469 3.73763 25.6033 3.87583C25.9597 4.01404 26.2835 4.2166 26.5563 4.47196C26.8291 4.72732 27.0454 5.03048 27.1931 5.36412C27.3407 5.69777 27.4167 6.05537 27.4167 6.4165V21.9998M27.4167 10.0832C27.4167 9.35383 27.7261 8.65435 28.277 8.13863C28.8279 7.6229 29.5751 7.33317 30.3542 7.33317C31.1332 7.33317 31.8804 7.6229 32.4313 8.13863C32.9822 8.65435 33.2917 9.35383 33.2917 10.0832V21.9998"
                            stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" id="jatuhan-merah-minus"
                    class="shadow-inset-custom  flex justify-center items-center w-[25%] bg-redDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <p class="font-bold text-whiteDefault text-lg">JATUHAN -</p>
                </button>
                <button type="button" id="jatuhan-merah-plus"
                    class="shadow-inset-custom  flex justify-center items-center w-[25%] bg-redDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <p class="font-bold text-whiteDefault text-lg">JATUHAN +</p>
                </button>

            </div>

            <div class="flex justify-between w-[70%]">
                <button id="disk-merah" type="button"
                    class="shadow-inset-custom flex justify-center items-center w-[100%] bg-redDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <p class="font-bold text-whiteDefault text-lg">DISKULIFIKASI</p>
                </button>
            </div>
            <div class="flex justify-between w-[70%]">
                <button type="button" id="popup-merah"
                    class="shadow-inset-custom flex justify-center items-center w-[100%] bg-redDefault disabled:cursor-not-allowed rounded-[14px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                    <p class="font-bold text-whiteDefault text-lg">MULAI PENGAMBILAN KEPUTUSAN</p>
                </button>
            </div>
        </div>
    </div>
    <script src="{{ mix('js/scoreUpdate.js') }}"></script>
    <script src="{{ mix('js/scoringDewan.js') }}"></script>
    <script src="{{ mix('js/dropVerification.js') }}"></script>
</body>

</html>
