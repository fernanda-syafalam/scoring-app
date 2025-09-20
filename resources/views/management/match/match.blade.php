@extends('layouts.dashboard')
@section('container')
<header class="flex-col mt-[4%]">
    <p class="text-2xl">Pertandingan</p>
    <div class="lg:flex lg:justify-between my-4">
        <form action="#" method="get" enctype="multipart/form-data">
            <div class="relative py-2">
                <label for="search"></label>
                <input type="search" id="search" name="search" value="{{ request('search') != '' ? request('search') : '' }}" class="block lg:w-[392px] w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Cari . . .">
            </div>
        </form>

        <div class="flex justify-between">
            <!-- Import toggle -->
        <button  data-modal-target="import-modal" data-modal-toggle="import-modal" type="button" class="w-full lg:w-auto text-white bg-blueDefault hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
            Impor
        </button>

            <!-- Import modal -->
            <div id="import-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative lg:w-[50%] w-[95%] max-h-full">
                    <!-- import content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="import-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="px-6 py-6 lg:px-8">
                            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Import Data Pertandingan</h3>
                            <div class="border border-gray-300"></div>
                            <form class="space-y-6" action="/management/import-pertandingan" method="POST" enctype="multipart/form-data">
                                @csrf
                                <div class="grid lg:grid-cols-1 ">
                                    <div class="flex flex-col items-start justify-center w-full mb-6 mt-4">
                                        <label class="block mb-2 text-md font-medium text-gray-900 dark:text-white" for="file_input">Data Pertandingan</label>
                                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="file_input" type="file" name="excel_file">
                                    </div>
                                    <div>
                                        <a href="/download/partai" class="text-blue-500 decoration-1 underline hover:text-blue-700">unduh contoh berkas "impor partai"</a>
                                    </div>
                                </div>

                                <button type="submit" class="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Kirim</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Tambah toggle -->
        <button data-modal-target="add-modal" data-modal-toggle="add-modal" type="button" class="w-full lg:w-auto text-white bg-blueDefault hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">
            Tambah
        </button>
        </div>

        <!-- Tambah modal -->
        <div id="add-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative lg:w-[50%] w-[95%] max-h-full">
                <!-- Tambah content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="px-6 py-6 lg:px-8">
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Tambah Pertandingan</h3>
                        <div class="border border-gray-300 my-6"></div>
                        <form class="space-y-6"  action="/create-pertandingan" method="post" enctype="multipart/form-data">
                            @csrf
                            <div class="grid md:grid-cols-3 md:gap-6">
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    <div class="relative z-0 w-full mb-4 group">
                                        <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Partai</label>
                                        <input value="{{ old('id') }}" type="number" name="id" id="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <label for="kelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelas</label>
                                        <select id="kelas" name="kelas" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>Pilih Kelas Tanding</option>
                                            @foreach($kelas as $class)
                                                <option value={{$class->value}}>{{$class->name}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="relative z-0 w-full mb-4 group">
                                    <label for="jenis_kelamin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis-kelamin</label>
                                    <select id="jenis_kelamin" name="jenis_kelamin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Pilih Jenis Kelamin</option>
                                        <option value="perempuan">Perempuan</option>
                                        <option value="laki-laki">Laki-laki</option>
                                    </select>
                                </div>
                                <div class="relative z-0 w-full mb-4 group">
                                    <label for="babak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Babak</label>
                                    <input value="{{ old('babak') }}" type="text" name="babak" id="babak" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                </div>
                            </div>
                            <div class="grid lg:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-4 group">
                                    <label for="sudut_merah" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peserta Sudut Merah</label>
                                    <input value="{{ old('sudut_merah') }}" type="text" name="sudut_merah" id="sudut_merah" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                </div>
                                <div class="relative z-0 w-full mb-4 group">
                                    <label for="sudut_biru" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peserta Sudut Biru</label>
                                    <input value="{{ old('sudut_biru') }}" type="text" name="sudut_biru" id="sudut_biru" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                </div>
                            </div>
                            <div class="grid lg:grid-cols-2 md:gap-6">
                                <div class="relative z-0 w-full mb-4 group">
                                    <label for="contingen_sudut_merah" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asal Peserta Sudut Merah</label>
                                    <input value="{{ old('contingen_sudut_merah') }}" type="text" name="contingen_sudut_merah" id="contingen_sudut_merah" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                </div>
                                <div class="relative z-0 w-full mb-4 group">
                                    <label for="contingen_sudut_biru" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asal Peserta Sudut Biru</label>
                                    <input value="{{ old('contingen_sudut_biru') }}" type="text" name="contingen_sudut_biru" id="contingen_sudut_biru" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                </div>
                            </div>
                            <button type="submit" class="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-[35px]">
    @if ($message = session('success'))
        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400 text-center" role="alert">
            <span class="font-medium">{{ $message }}</span>
        </div>
    @elseif ($message = session('error'))
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
            <span class="font-medium">{{ $message }}</span>
        </div>
    @endif

    @if ($errors->any())
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
            <ul>
                @foreach ($errors->all() as $error)
                    <li><span class="font-medium">{{ $error }}</span></li>
                @endforeach
            </ul>
        </div>
    @endif

    @if($partais->total() == 0)
        <div id="toast-undo" class="fixed flex items-center justify-between w-full max-w-xs p-4 space-x-4 text-black bg-red-500 divide-x divide-red-200 rounded-lg shadow top-5 right-5" role="alert">
            <div class="text-sm font-bold">
                Upps, data tidak ditemukan
            </div>
            <div class="flex items-center ml-auto space-x-2">
                <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-600 hover:text-red-900 rounded-lg focus:ring-2 focus:ring-red-300 p-1.5 hover:bg-red-100 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-undo" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
        </div>
    @endif
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
                No
            </th>
            <th scope="col" class="px-6 py-3">
                Partai
            </th>
            <th scope="col" class="px-6 py-3">
                Kelas
            </th>
            <th scope="col" class="px-6 py-3">
                Babak
            </th>
            <th scope="col" class="px-6 py-3">
                Jenis - Kelamin
            </th>
            <th scope="col" class="pl-6 pr-20 py-3">
                Sudut Biru
            </th>
            <th scope="col" class="pl-6 pr-20 py-3">
                Sudut Merah
            </th>
            <th scope="col" class="px-6 py-3">
                Tindakan
            </th>
        </tr>
        </thead>
        <tbody>
        @foreach($partais as $partai)
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{$loop->iteration}}
                </th>
                <td class="px-6 py-4">
                    {{$partai->id}}
                </td>
                <td class="px-6 py-4">
                    {{$partai->kelas}}
                </td>
                <td class="px-6 py-4">
                    {{$partai->babak}}
                </td>
                <td class="px-6 py-4">
                    {{$partai->jenis_kelamin}}
                </td>
                <td class="px-6 py-4">
                    {{$partai->sudut_merah}}
                </td>
                <td class="px-6 py-4">
                    {{$partai->sudut_biru}}
                </td>
                <td class="px-6 py-4 flex">
                    <!-- Edit Modal -->
                    <button data-modal-target="edit-modal-{{$partai->id}}" data-modal-toggle="edit-modal-{{$partai->id}}" class="mr-4 whitespace-nowrap block text-white bg-blueDefault hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center" type="button">
                        Ubah
                    </button>
                    <!-- Delete Modal -->
                    <button data-modal-target="delete-modal-{{$partai->id}}" data-modal-toggle="delete-modal-{{$partai->id}}" class="whitespace-nowrap block text-white bg-redDefault hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center" type="button">
                        Hapus
                    </button>

                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
        @foreach($partais as $partai)
            <div id="edit-modal-{{$partai->id}}" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative lg:w-[50%] w-[95%] max-h-full">
                    <!-- Tambah content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-modal-{{$partai->id}}">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="px-6 py-6 lg:px-8">
                            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update User</h3>
                            <div class="border border-gray-300 my-6"></div>
                            <form class="space-y-6" action="/edit-pertandingan/{{$partai->id}}" method="post" enctype="multipart/form-data">
                                @csrf
                                @method('put')
                                <div class="grid md:grid-cols-3 md:gap-6">
                                    <div class="grid md:grid-cols-2 md:gap-6">
                                        <div class="relative z-0 w-full mb-4 group">
                                            <label for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Partai</label>
                                            <input value="{{ old('id')??$partai->id}}" type="number" name="id" id="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                        </div>
                                        <div class="relative z-0 w-full mb-4 group">
                                            <label for="kelas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelas</label>
                                            <select id="kelas" name="kelas" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                @foreach($kelas as $class)
                                                    @if($class->value === $partai->kelas)
                                                        <option selected value={{$class->value}}>{{$class->name}}</option>
                                                    @else
                                                        <option value={{$class->value}}>{{$class->name}}</option>
                                                    @endif
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <label for="jenis_kelamin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis-kelamin</label>
                                        <select id="jenis_kelamin" name="jenis_kelamin" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option {{ $partai->jenis_kelamin === "perempuan" ? 'selected' : "" }} value="perempuan">Perempuan</option>
                                            <option {{ $partai->jenis_kelamin === "laki-laki" ? 'selected' : "" }} value="laki-laki">Laki-laki</option>
                                        </select>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <label for="babak" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama pertandingan</label>
                                        <input value="{{ old('babak')??$partai->babak }}" type="text" name="babak" id="babak" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                    </div>
                                </div>
                                <div class="grid lg:grid-cols-2 md:gap-6">
                                    <div class="relative z-0 w-full mb-4 group">
                                        <label for="sudut_merah" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sudut Merah</label>
                                        <input value="{{ old('sudut_merah')??$partai->sudut_merah }}" type="text" name="sudut_merah" id="sudut_merah" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <label for="sudut_biru" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sudut Biru</label>
                                        <input value="{{ old('sudut_biru')??$partai->sudut_biru }}" type="text" name="sudut_biru" id="sudut_biru" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                    </div>
                                </div>
                                <div class="grid lg:grid-cols-2 md:gap-6">
                                    <div class="relative z-0 w-full mb-4 group">
                                        <label for="contingen_sudut_merah" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asal Sudut Merah</label>
                                        <input value="{{ old('contingen_sudut_merah')??$partai->contingen_sudut_merah }}" type="text" name="contingen_sudut_merah" id="contingen_sudut_merah" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                    </div>
                                    <div class="relative z-0 w-full mb-4 group">
                                        <label for="contingen_sudut_biru" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asal Sudut Biru</label>
                                        <input value="{{ old('contingen_sudut_biru')??$partai->contingen_sudut_biru }}" type="text" name="contingen_sudut_biru" id="contingen_sudut_biru" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                                    </div>
                                </div>
                                <button type="submit" class="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="delete-modal-{{$partai->id}}" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-modal-{{$partai->id}}">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-6 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah anda yakin ingin menghapus pertandingan ini?</h3>
                            <form action="/delete-pertandingan/{{$partai->id}}" method="post" class="inline">
                                @method('delete')
                                @csrf
                                <button type="submit" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Iya, saya yakin
                                </button>
                            </form>
                            <button data-modal-hide="delete-modal-{{$partai->id}}" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                Tidak, batalkan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        @endforeach
</div>
    {{ $partais->appends(request()->except('page'))->onEachSide(1)->links('partials.pagination') }}
@endsection
