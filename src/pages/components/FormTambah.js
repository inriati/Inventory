import React from 'react';
import { Form } from '@themesberg/react-bootstrap';
import '../../assets/style.css';

const FormTambah = ({ index, item, changeHandler }) => {
    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Kategori<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select required name='kategori' value={item.kategori} onChange={event => changeHandler(event, index)} >
                    <option defaultValue>Pilih Kategori</option>
                    <option>Peralatan Kantor</option>
                    <option>Alat Dapur</option>
                    <option>Kendaraan Operational</option>
                    <option>Kendaraan Dinas Jabatan</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Kode Aset</Form.Label>
                <Form.Control type="text" name="kodeAset" placeholder='Masukkan Kode Aset' value={item.kodeAset} onChange={event => changeHandler(event, index)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Nama Aset<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control required type="text" name='nama' placeholder='Masukkan Nama Aset' value={item.nama} onChange={event => changeHandler(event, index)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>No. Registrasi<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control required type="number" name='noRegister' placeholder='Isikan No. Register' value={item.noRegister} onChange={event => changeHandler(event, index)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Merk/Type Aset</Form.Label>
                <Form.Control type="text" name='merk' placeholder='Masukkan Merk/Type Aset' value={item.merk} onChange={event => changeHandler(event, index)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Tahun Pembelian</Form.Label>
                <Form.Control type="text" name='tahun' placeholder='Isikan Tahun Pembelian' value={item.tahun} onChange={event => changeHandler(event, index)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Lokasi<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control required type="text" name='lokasi' placeholder='Masukkan lokasi Aset' value={item.lokasi} onChange={event => changeHandler(event, index)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Jumlah Aset</Form.Label>
                <Form.Control type="text" name='jumlah' placeholder='Masukkan Jumlah Aset' value={item.jumlah} onChange={event => changeHandler(event, index)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Kondisi Aset<span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control required type="text" name='kondisi' placeholder='Masukkan Kondisi Aset' value={item.kondisi} onChange={event => changeHandler(event, index)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Foto</Form.Label>
                <Form.Control type="file" name='foto' value={item.foto} onChange={event => changeHandler(event, index)} />
            </Form.Group>
        </div>
    );
};

export default FormTambah;
