<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePartaiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'babak' => 'required|string',
            'sudut_biru' => 'required|string|max:100|min:3',
            'sudut_merah' => 'required|string|max:100|min:3',
            'contingen_sudut_biru' => 'required|string|max:100|min:3',
            'contingen_sudut_merah' => 'required|string|max:100|min:3',
            'kelas' => 'required|string|max:2|min:1|in:' . implode(',', config('app_settings.kelas')),
            'jenis_kelamin' => 'required|string|in:putra,putri',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'babak.required' => 'Babak wajib diisi.',
            'sudut_biru.required' => 'Nama sudut biru wajib diisi.',
            'sudut_merah.required' => 'Nama sudut merah wajib diisi.',
            'contingen_sudut_biru.required' => 'Kontingen sudut biru wajib diisi.',
            'contingen_sudut_merah.required' => 'Kontingen sudut merah wajib diisi.',
            'kelas.required' => 'Kelas wajib dipilih.',
            'kelas.in' => 'Kelas tidak valid.',
            'jenis_kelamin.required' => 'Jenis kelamin wajib dipilih.',
            'jenis_kelamin.in' => 'Jenis kelamin harus putra atau putri.',
        ];
    }
}
