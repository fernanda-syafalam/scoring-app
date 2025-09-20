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
        <x-drop-verification />
        <x-winner-modal />

        <div id="header" class="hidden lg:flex justify-between uppercase">
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
    <s class="text-whiteDefault">1</s>
    <div id="first-line-point-group" class="flex lg:justify-between gap-2 lg:gap-0 mt-[0%] lg:mt-[5%]">
        <div class="w-full flex justify-between lg:justify-normal">
            <div id="round-1-blueInput-div"
                class="bg-blueDefault py-3 w-[83%] lg:w-[70%] rounded-r-[20px] pl-6 shadow-inset-custom">
                <p id="round-1-blueInput" class="text-whiteDefault"></p>
            </div>
            <div id="round-1-blueScore-div"
                class="flex items-center justify-center w-[54px] h-[54px] bg-blueDefault rounded-full ml-[2%] shadow-inset-custom">
                <p id="round-1-blueScore" class="text-whiteDefault">0</p>
            </div>
        </div>
        <button id="visible-header" type="button"
            class="bg-blueDefault text-white h-8 px-6 rounded-xl block lg:hidden">
            Lihat
        </button>
        <div class="w-full flex justify-end">
            <div id="round-1-redScore-div"
                class="flex items-center justify-center w-[54px] h-[54px] bg-redDefault rounded-full mr-[2%] shadow-inset-custom">
                <p id="round-1-redScore" class="text-whiteDefault">0</p>
            </div>
            <div id="round-1-redInput-div"
                class="bg-redDefault py-3 w-[83%] lg:w-[70%] rounded-l-[20px] pr-6 shadow-inset-custom">
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

    <div class="flex justify-between mt-0 lg:mt-[5%] ml-0 mr-0 lg:ml-[2%] lg:mr-[2%]">
        <!--left side-->
        <div class="flex flex-row lg:flex-col justify-start w-[50%]">
            <div class="flex items-center">
                <button id="pukul-biru" type="button"
                    class="bg-blueDefault shadow-inset-custom hover:bg-blueDark disabled:cursor-not-allowed rounded-[24px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 transform transition-transform ease-in-out duration-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="89" viewBox="0 0 90 89"
                        fill="none">
                        <path
                            d="M47.2546 9.01951C46.3879 9.03584 45.4879 9.37549 44.6212 10.0564C43.3379 11.0411 42.2212 12.7409 41.6545 14.8866C41.1045 17.0323 41.2379 19.1649 41.8379 20.8043C42.4379 22.4209 43.4046 23.4823 44.6046 23.8905C45.6046 24.2335 46.7046 24.1028 47.7713 23.466C48.1546 21.2452 49.4213 19.5012 51.3213 18.3059C51.338 18.2749 51.338 18.2439 51.3546 18.2112C51.9046 16.0639 51.7713 13.933 51.1713 12.3001C50.5713 10.6753 49.6046 9.61226 48.4046 9.2024C48.0213 9.07503 47.6379 9.01298 47.2546 9.01951ZM82.6716 17.0715C82.1382 17.189 80.8382 17.6332 79.5549 18.239C78.1049 18.915 76.6549 19.6858 75.8215 20.1169L75.6715 20.1903L75.5215 20.2312C69.1715 21.9637 65.9381 23.1557 60.8047 24.0212C60.438 25.0173 59.8047 26.0623 58.9214 27.1237H58.9047V27.1401C57.8714 28.3484 56.838 29.5404 55.788 30.7162C63.4214 29.3282 68.9215 27.9892 77.9049 24.511L78.5882 24.2498L79.2382 24.6254C80.1549 25.1805 81.4716 25.5724 82.5049 25.6541C83.0216 25.7031 83.4716 25.6541 83.7383 25.5888C83.9716 25.5235 83.9716 25.4745 83.9716 25.4908C84.8716 23.5476 85.1883 21.5065 84.8883 19.9715C84.6049 18.5199 83.9382 17.5809 82.6716 17.0715ZM55.688 20.0499C54.2047 20.0336 52.338 20.7553 51.088 22.6005C50.1046 27.4177 46.6379 30.7815 41.5545 32.8226L40.4212 30.112C42.5379 29.2629 44.1879 28.2831 45.4379 27.0747C44.9212 27.0421 44.3879 26.9278 43.8712 26.7482C42.1379 26.144 40.7712 24.854 39.8545 23.2537C37.4212 23.7109 36.0878 24.2824 34.3878 25.6378C33.7045 31.5979 35.5212 36.66 38.9879 41.4118C45.9379 37.2642 51.2713 31.5326 56.6047 25.2622C57.9714 23.5966 58.2714 22.3882 58.188 21.6861C58.088 21.0003 57.738 20.5871 56.988 20.285C56.6213 20.1364 56.1713 20.0532 55.688 20.0499ZM32.2378 34.6515C31.9545 38.4399 32.1211 42.5712 32.0711 46.8984V47.5189L31.6211 47.9435C22.906 56.2061 15.971 69.7593 13.7143 85.3048H20.4844C22.0044 78.5771 23.396 71.8658 26.2661 66.4118C29.3044 60.6476 34.2378 56.2877 42.3045 55.3896L43.1046 55.2916L43.6212 55.8958C49.9879 63.3583 56.1713 72.8619 57.938 85.3048H64.5381C63.4881 70.8697 56.738 59.7495 48.3546 47.9108C46.7213 45.6084 46.6546 43.0447 47.2713 40.579C47.4213 39.9585 47.6213 39.3217 47.8379 38.6685C45.2546 40.8893 42.4545 42.9141 39.3379 44.6613L38.1878 45.2982L37.4045 44.2857C35.0711 41.3138 33.2711 38.1133 32.2378 34.6515Z"
                            fill="white" />
                    </svg>
                </button>
                <div class="hidden lg:flex lg:flex-col lg:items-center ml-24">
                    <p class="text-base font-bold">
                        INDICATOR PUKULAN
                    </p>
                    <div class="flex justify-center mt-[8%]">
                        <div id="juri-pertama-pukulan-blue"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] rounded-[10px]">
                            <p class="text-whiteDefault">1</p>
                        </div>
                        <div id="juri-kedua-pukulan-blue"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] mx-[24px] rounded-[10px]">
                            <p class="text-whiteDefault">1</p>
                        </div>
                        <div id="juri-ketiga-pukulan-blue"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] rounded-[10px]">
                            <p class="text-whiteDefault">1</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center mt-0 lg:mt-[3%]">
                <button id="tendang-biru" type="button"
                    class="bg-blueDefault shadow-inset-custom hover:bg-blueDark disabled:cursor-not-allowed rounded-[24px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 transform transition-transform ease-in-out duration-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="90" viewBox="0 0 92 90"
                        fill="none">
                        <g clip-path="url(#clip0_108_809)">
                            <path
                                d="M10.3679 10.535C10.1221 10.5406 9.87856 10.5825 9.64508 10.6594C8.72484 10.9633 7.9821 11.8124 7.58374 13.228C7.18537 14.6436 7.21482 16.5442 7.85662 18.4705C8.49841 20.3969 9.61596 21.9385 10.785 22.8363C11.9543 23.7341 13.059 23.9727 13.9795 23.6687C14.8997 23.3647 15.6421 22.516 16.0403 21.1002C16.4387 19.6846 16.4094 17.7839 15.7674 15.8575C15.1256 13.931 14.0082 12.3899 12.839 11.4921C11.9621 10.8187 11.1216 10.516 10.3679 10.535ZM40.459 12.5592C39.8928 12.5849 39.3948 12.8454 39.1093 13.4335L36.8786 17.4817L32.5052 22.7674C32.5052 22.7674 23.6983 21.2087 20.7197 21.6447C20.1015 21.7342 19.4842 21.8306 18.8681 21.9337C18.2769 24.0042 16.9362 25.7933 14.9103 26.4625C13.0268 27.0846 11.0373 26.5773 9.38708 25.4518C8.64025 26.0261 7.94954 26.692 7.33278 27.4689C4.27774 29.8673 3.01623 31.5175 0.445284 33.1818C0.949658 30.7501 2.19301 28.3267 3.55791 26.3304C3.78204 26.0028 5.43847 24.6037 5.66636 24.3008C6.89008 21.895 4.28167 17.558 1.82573 21.7062C1.5926 22.0299 0.623934 24.7944 0.383281 25.1574C-2.001 29.88 -3.49007 32.9802 -2.14824 37.6441C-1.69736 39.211 2.90859 36.8416 6.8873 34.0189C11.2176 40.1277 16.5992 41.9704 19.709 44.3384C15.9027 57.9799 21.3887 68.4304 24.4985 78.3212L19.7298 84.2248C18.279 85.9634 27.6988 86.3701 28.3043 84.3475L29.5656 78.8113C24.8489 64.0044 29.0516 53.0142 32.4482 44.8283C41.4802 35.169 51.2997 31.3635 60.08 23.7583L67.4913 22.1821C69.2661 18.9239 69.1659 17.3154 65.2249 17.1601L57.8754 20.0386C48.618 25.2422 33.9884 28.7663 27.3649 36.0696C27.2182 33.7719 24.5183 28.3314 23.9454 26.5094C27.1148 26.9304 31.4166 27.2003 33.8663 26.0706C36.4847 24.8633 39.3681 19.3965 39.3681 19.3965L42.585 17.016C45.3768 15.3705 42.4819 12.4683 40.4592 12.5595L40.459 12.5592Z"
                                fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_108_809">
                                <rect width="91.7822" height="90" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <div class="hidden lg:flex lg:flex-col lg:items-center ml-24">
                    <p class="text-base font-bold">
                        INDICATOR TENDANGAN
                    </p>
                    <div class="flex justify-center mt-[8%]">
                        <div id="juri-pertama-tendangan-blue"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] rounded-[10px]">
                            <p class="text-whiteDefault">2</p>
                        </div>
                        <div id="juri-kedua-tendangan-blue"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] mx-[24px] rounded-[10px]">
                            <p class="text-whiteDefault">2</p>
                        </div>
                        <div id="juri-ketiga-tendangan-blue"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] rounded-[10px]">
                            <p class="text-whiteDefault">2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <x-logout-button></x-logout-button>

        <!--Right side-->
        <div class="flex flex-row lg:flex-col justify-end lg:justify-start items-end w-[50%]">
            <div class="flex items-center">
                <div class="hidden lg:flex lg:flex-col lg:items-center mr-24">
                    <p class="text-base font-bold">
                        INDICATOR PUKULAN
                    </p>
                    <div class="flex justify-center mt-[8%]">
                        <div id="juri-pertama-pukulan-red"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] rounded-[10px]">
                            <p class="text-whiteDefault">1</p>
                        </div>
                        <div id="juri-kedua-pukulan-red"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] mx-[24px] rounded-[10px]">
                            <p class="text-whiteDefault">1</p>
                        </div>
                        <div id="juri-ketiga-pukulan-red"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] rounded-[10px]">
                            <p class="text-whiteDefault">1</p>
                        </div>
                    </div>
                </div>
                <button id="pukul-merah" type="button"
                    class="bg-redDefault shadow-inset-custom hover:bg-redDark disabled:cursor-not-allowed rounded-[24px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 transform transition-transform ease-in-out duration-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90"
                        fill="none">
                        <path
                            d="M51.0469 5.01515C51.9609 5.03273 52.9101 5.39835 53.8242 6.13136C55.1777 7.19132 56.3555 9.02121 56.9531 11.331C57.5332 13.6407 57.3926 15.9364 56.7598 17.7013C56.1269 19.4415 55.1074 20.5841 53.8418 21.0236C52.7871 21.3927 51.6269 21.2521 50.5019 20.5665C50.0976 18.1759 48.7617 16.2985 46.7578 15.0118C46.7402 14.9784 46.7402 14.945 46.7226 14.9099C46.1426 12.5984 46.2832 10.3044 46.916 8.5466C47.5488 6.79757 48.5683 5.65324 49.834 5.21203C50.2383 5.07492 50.6426 5.00812 51.0469 5.01515ZM13.6934 13.6829C14.2559 13.8095 15.6269 14.2876 16.9805 14.9398C18.5098 15.6675 20.039 16.4972 20.918 16.9612L21.0762 17.0403L21.2344 17.0843C27.9316 18.9493 31.3418 20.2325 36.7559 21.1642C37.1426 22.2364 37.8105 23.3614 38.7422 24.504H38.7598V24.5216C39.8496 25.8224 40.9394 27.1056 42.0469 28.3712C33.9961 26.8771 28.1953 25.4357 18.7207 21.6915L18 21.4103L17.3144 21.8146C16.3476 22.4122 14.959 22.8341 13.8691 22.922C13.3242 22.9747 12.8496 22.922 12.5683 22.8517C12.3223 22.7814 12.3223 22.7286 12.3223 22.7462C11.373 20.6544 11.0391 18.4571 11.3555 16.8048C11.6543 15.2421 12.3574 14.2314 13.6934 13.6829ZM42.1523 16.8892C43.7168 16.8716 45.6855 17.6485 47.0039 19.6349C48.041 24.8204 51.6973 28.4415 57.0586 30.6388L58.2539 27.7208C56.0215 26.8068 54.2812 25.7521 52.9629 24.4513C53.5078 24.4161 54.0703 24.2931 54.6152 24.0997C56.4433 23.4493 57.8848 22.0607 58.8516 20.338C61.418 20.8302 62.8242 21.4454 64.6172 22.9044C65.3379 29.3204 63.4219 34.7696 59.7656 39.8849C52.4355 35.42 46.8105 29.2501 41.1855 22.5001C39.7441 20.7071 39.4277 19.4064 39.5156 18.6505C39.6211 17.9122 39.9902 17.4675 40.7812 17.1423C41.168 16.9823 41.6426 16.8927 42.1523 16.8892ZM66.8848 32.6075C67.1836 36.6857 67.0078 41.1329 67.0605 45.7911V46.4591L67.5351 46.9161C76.7267 55.8107 84.041 70.4005 86.4211 87.1349H79.2808C77.6777 79.8927 76.2099 72.6681 73.183 66.797C69.9785 60.5919 64.7754 55.8986 56.2676 54.9318L55.4238 54.8263L54.8789 55.4767C48.1641 63.5099 41.6426 73.7403 39.7793 87.1349H32.8183C33.9258 71.5958 41.0449 59.6251 49.8867 46.881C51.6094 44.4025 51.6797 41.6427 51.0293 38.9884C50.8711 38.3204 50.6601 37.6349 50.4316 36.9318C53.1562 39.3224 56.1094 41.5021 59.3965 43.3829L60.6094 44.0685L61.4355 42.9786C63.8965 39.7794 65.7949 36.3341 66.8848 32.6075Z"
                            fill="white" />
                    </svg>
                </button>
            </div>
            <div class="flex items-center mt-[3%]">
                <div class="hidden lg:flex lg:flex-col lg:items-center mr-24">
                    <p class="text-base font-bold">
                        INDICATOR TENDANGAN
                    </p>
                    <div class="flex justify-center mt-[8%]">
                        <div id="juri-pertama-tendangan-red"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] rounded-[10px]">
                            <p class="text-whiteDefault">2</p>
                        </div>
                        <div id="juri-kedua-tendangan-red"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] mx-[24px] rounded-[10px]">
                            <p class="text-whiteDefault">2</p>
                        </div>
                        <div id="juri-ketiga-tendangan-red"
                            class="flex items-center justify-center bg-grayDefault shadow-inset-custom w-[68px] h-[45px] rounded-[10px]">
                            <p class="text-whiteDefault">2</p>
                        </div>
                    </div>
                </div>
                <button id="tendang-merah" type="button"
                    class="bg-redDefault shadow-inset-custom hover:bg-redDark disabled:cursor-not-allowed rounded-[24px] text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 transform transition-transform ease-in-out duration-100 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="90" viewBox="0 0 92 90"
                        fill="none">
                        <path
                            d="M72.7213 10.535C72.967 10.5406 73.2105 10.5825 73.444 10.6594C74.3643 10.9633 75.107 11.8124 75.5054 13.228C75.9037 14.6436 75.8743 16.5442 75.2325 18.4705C74.5907 20.3969 73.4732 21.9385 72.3041 22.8363C71.1348 23.7341 70.0301 23.9727 69.1097 23.6687C68.1894 23.3647 67.447 22.516 67.0488 21.1002C66.6504 19.6846 66.6797 17.7839 67.3217 15.8575C67.9635 13.931 69.0809 12.3899 70.2501 11.4921C71.127 10.8187 71.9676 10.516 72.7213 10.535ZM42.6301 12.5592C43.1963 12.5849 43.6943 12.8454 43.9798 13.4335L46.2105 17.4817L50.5839 22.7674C50.5839 22.7674 59.3908 21.2087 62.3694 21.6447C62.9877 21.7342 63.6049 21.8306 64.221 21.9337C64.8123 24.0042 66.1529 25.7933 68.1788 26.4625C70.0623 27.0846 72.0518 26.5773 73.702 25.4518C74.4489 26.0261 75.1396 26.692 75.7563 27.4689C78.8114 29.8673 80.0729 31.5175 82.6438 33.1818C82.1395 30.7501 80.8961 28.3267 79.5312 26.3304C79.3071 26.0028 77.6506 24.6037 77.4227 24.3008C76.199 21.895 78.8074 17.558 81.2634 21.7062C81.4965 22.0299 82.4652 24.7944 82.7058 25.1574C85.0901 29.88 86.5792 32.9802 85.2374 37.6441C84.7865 39.211 80.1805 36.8416 76.2018 34.0189C71.8715 40.1277 66.49 41.9704 63.3801 44.3384C67.1864 57.9799 61.7005 68.4304 58.5906 78.3212L63.3593 84.2248C64.8101 85.9634 55.3903 86.3701 54.7848 84.3475L53.5235 78.8113C58.2402 64.0044 54.0375 53.0142 50.6409 44.8283C41.6089 35.169 31.7894 31.3635 23.0091 23.7583L15.5978 22.1821C13.8231 18.9239 13.9232 17.3154 17.8643 17.1601L25.2138 20.0386C34.4711 25.2422 49.1008 28.7663 55.7242 36.0696C55.871 33.7719 58.5708 28.3314 59.1437 26.5094C55.9743 26.9304 51.6725 27.2003 49.2228 26.0706C46.6044 24.8633 43.721 19.3965 43.721 19.3965L40.5042 17.016C37.7123 15.3705 40.6072 12.4683 42.63 12.5595L42.6301 12.5592Z"
                            fill="white" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    <script type="module" src="{{ mix('js/scoringJuri.js') }}"></script>
    <script type="module" src="{{ mix('js/scoreUpdate.js') }}"></script>
    <script src="{{ mix('js/dropVerification.js') }}"></script>
</body>

</html>
