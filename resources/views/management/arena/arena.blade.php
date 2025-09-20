@extends('layouts.dashboard')
@section('container')
<header class="flex-col mt-[4%]">
    <p class="text-2xl">Gelanggang</p>
    <div class="lg:flex lg:justify-between my-4">
        <form action="#" method="get" enctype="multipart/form-data">
            <div class="relative py-2">
                <input type="search" name="search" value="{{ request('search') != '' ? request('search') : '' }}" class="block lg:w-[392px] w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Cari . . .">
            </div>
        </form>

        <div class="flex justify-between">
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
                        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Tambah Gelanggang</h3>
                        <div class="border border-gray-300 my-6"></div>
                        <form class="space-y-6" action="/management/create-gelanggang" method="post" enctype="multipart/form-data">
                            @csrf
                            <div class="grid md:gap-6">
                                <div class="relative z-0 w-full mb-4 group">
                                    <label for="nama_gelanggang" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                    <input value="{{ old('nama_gelanggang') }}" type="text" name="nama_gelanggang" id="nama_gelanggang" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
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

    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="pl-6 py-3">
                No
            </th>
            <th scope="col" class="px-6 py-3">
                Gelanggang
            </th>
            <th scope="col" class="pr-6 py-3">
                Juri Pertama
            </th>
            <th scope="col" class="pr-6 py-3">
                Juri Kedua
            </th>
            <th scope="col" class="pr-6 py-3">
                Juri Ketiga
            </th>
            <th scope="col" class="pr-6 py-3">
                Dewan
            </th>
            <th scope="col" class="pr-6 py-3">
                Ketua
            </th>
            <th scope="col" class="pr-6 py-3">
                Operator
            </th>
            <th scope="col" class="pr-6 py-3">
                Tamu
            </th>
            <th scope="col" class="pl-10 py-3">
                Tindakan
            </th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            @foreach($gelanggangs as $g)
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ $loop->iteration }}
            </th>
            <td class="px-6 py-4">
                {{ $g['nama_gelanggang'] }}
            </td>
            @foreach(['Juri Pertama', 'Juri Kedua', 'Juri Ketiga', 'Dewan','Ketua', 'Operator','Guest'] as $role)
            <td class="py-4">
                @foreach($g['peran_user'] as $pu)
                @if ($pu['nama_role'] == $role)
                {{ $pu['nama_user'] }}
                @endif
                @endforeach
            </td>
            @endforeach
            <td class="pl-10 py-4 flex">
                <!-- Edit Modal -->
                <button data-modal-target="edit-modal-{{$g['id']}}" data-modal-toggle="edit-modal-{{$g['id']}}" class="mr-4 whitespace-nowrap block text-white bg-blueDefault hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center" type="button">
                    Ubah
                </button>
                <!-- Delete Modal -->
                <button data-modal-target="delete-modal-{{$g['id']}}" data-modal-toggle="delete-modal-{{$g['id']}}" class="whitespace-nowrap block text-white bg-redDefault hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center" type="button">
                    Hapus
                </button>
            </td>
        </tr>
        @endforeach
        </tbody>
    </table>

    @foreach($gelanggangs as $g)
    <!-- Edit modal -->
    <div id="edit-modal-{{$g['id']}}" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative lg:w-[50%] w-[95%] max-h-full">
            <!-- Tambah content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-modal-{{$g['id']}}">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Pertandingan</h3>
                    <div class="border border-gray-300 my-6"></div>
                    <form class="space-y-6" action="/management/edit-gelanggang/{{$g['id']}}" method="post" enctype="multipart/form-data">
                        @csrf
                        @method('put')
                        <div class="grid lg:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-4 group">
                                <label for="nama_gelanggang" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
                                <input value="{{ old('nama_gelanggang') ?? $g['nama_gelanggang'] }}" type="text" name="nama_gelanggang" id="nama_gelanggang" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required>
                            </div>
                            <div class="relative z-0 w-full mb-4 group">
                                <label for="juri1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Juri 1</label>
                                <select required id="juri1" name="juri1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    @if($g['peran_user'][0]['nama_role'] !== "")
                                        @foreach($juri1U as $j1)
                                            @foreach($g['peran_user'] as $g_role)
                                                @if($j1->name === $g_role['nama_user'])
                                                    <option selected value={{$j1->id}}>{{$j1->name}}</option>
                                                @endif
                                            @endforeach
                                        @endforeach
                                    @else
                                        <option selected>Pilih Juri Pertama</option>
                                    @endif
                                    @foreach($juri1C as $j1)
                                            <option value={{$j1->id}}>{{$j1->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="grid lg:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-4 group">
                                <label for="juri2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Juri 2</label>
                                <select required id="juri2" name="juri2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    @if($g['peran_user'][0]['nama_role'] !== "")
                                        @foreach($juri2U as $j2)
                                            @foreach($g['peran_user'] as $g_role)
                                                @if($j2->name === $g_role['nama_user'])
                                                    <option selected value={{$j2->id}}>{{$j2->name}}</option>
                                                @endif
                                            @endforeach
                                        @endforeach
                                    @else
                                        <option selected>Pilih Juri Kedua</option>
                                    @endif
                                    @foreach($juri2C as $j2)
                                        <option value={{$j2->id}}>{{$j2->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="relative z-0 w-full mb-4 group">
                                <label for="juri3" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Juri 3</label>
                                <select required id="juri3" name="juri3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    @if($g['peran_user'][0]['nama_role'] !== "")
                                        @foreach($juri3U as $j3)
                                            @foreach($g['peran_user'] as $g_role)
                                                @if($j3->name === $g_role['nama_user'])
                                                    <option selected value={{$j3->id}}>{{$j3->name}}</option>
                                                @endif
                                            @endforeach
                                        @endforeach
                                    @else
                                        <option selected>Pilih Juri ketiga</option>
                                    @endif
                                    @foreach($juri3C as $j3)
                                        <option value={{$j3->id}}>{{$j3->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="grid lg:grid-cols-2 md:gap-6">
                            <div class="relative z-0 w-full mb-4 group">
                                <label for="dewan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dewan</label>
                                <select required id="dewan" name="dewan" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    @if($g['peran_user'][0]['nama_role'] !== "")
                                        @foreach($dewanU as $j1)
                                            @foreach($g['peran_user'] as $g_role)
                                                @if($j1->name === $g_role['nama_user'])
                                                    <option value={{$j1->id}}>{{$j1->name}}</option>
                                                @endif
                                            @endforeach
                                        @endforeach
                                    @else
                                        <option selected>Pilih Dewan</option>
                                    @endif
                                    @foreach($dewanC as $j1)
                                        <option value={{$j1->id}}>{{$j1->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="relative z-0 w-full mb-4 group">
                                <label for="ketua" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ketua</label>
                                <select required id="ketua" name="ketua" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    @if($g['peran_user'][0]['nama_role'] !== "")
                                        @foreach($ketuaU as $j1)
                                            @foreach($g['peran_user'] as $g_role)
                                                @if($j1->name === $g_role['nama_user'])
                                                    <option value={{$j1->id}}>{{$j1->name}}</option>
                                                @endif
                                            @endforeach
                                        @endforeach
                                    @else
                                        <option selected>Pilih Ketua</option>
                                    @endif
                                    @foreach($ketuaC as $j1)
                                        <option value={{$j1->id}}>{{$j1->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="relative z-0 w-full mb-4 group">
                                <label for="guest" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Guest</label>
                                <select required id="guest" name="guest" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    @if($g['peran_user'][0]['nama_role'] !== "")
                                        @foreach($guestU as $j1)
                                            @foreach($g['peran_user'] as $g_role)
                                                @if($j1->name === $g_role['nama_user'])
                                                    <option selected value={{$j1->id}}>{{$j1->name}}</option>
                                                @endif
                                            @endforeach
                                        @endforeach
                                    @else
                                        <option selected>Pilih Guest</option>
                                    @endif
                                    @foreach($guestC as $j1)
                                        <option value={{$j1->id}}>{{$j1->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="relative z-0 w-full mb-4 group">
                                <label for="operator" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Operator</label>
                                <select required id="operator" name="operator" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    @if($g['peran_user'][0]['nama_role'] !== "")
                                        @foreach($operatorU as $j1)
                                            @foreach($g['peran_user'] as $g_role)
                                                @if($j1->name === $g_role['nama_user'])
                                                    <option selected value={{$j1->id}}>{{$j1->name}}</option>
                                                @endif
                                            @endforeach
                                        @endforeach
                                    @else
                                        <option selected>Pilih Operator</option>
                                    @endif
                                    @foreach($operatorC as $j1)
                                        <option value={{$j1->id}}>{{$j1->name}}</option>
                                    @endforeach
                                </select>
                            </div>

                        </div>
                        <button type="submit" class="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
     </div>

    <!-- Delete modal -->
    <div id="delete-modal-{{$g['id']}}" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-modal-{{$g['id']}}">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center">
                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Apakah anda yakin ingin menghapus gelanggang ini?</h3>
                    <form action="/management/delete-gelanggang/{{$g['id']}}" method="post" class="inline">
                        @method('delete')
                        @csrf
                        <button type="submit" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Iya, saya yakin
                        </button>
                    </form>
                    <button data-modal-hide="delete-modal-{{$g['id']}}" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Tidak, batalkan
                    </button>
                </div>
            </div>
        </div>
    </div>
    @endforeach
</div>
@endsection
