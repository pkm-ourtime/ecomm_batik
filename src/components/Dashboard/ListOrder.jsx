

const ListOrders = () => {
    return (
        <div class="overflow-x-auto">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nomor Pelanggan</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nama pelanggan</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email Pelanggan</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Harga Pesanan</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status Pesanan</th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Tanggal pesan</th>
            </tr>
          </thead>
          <tbody class="divine-y divine-gray-200 text-center">
            <tr>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">0001</td>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">alex</td>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">alex@email.com</td>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Rp 50.000,00</td>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">delivered</td>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">20-01-2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default ListOrders;
