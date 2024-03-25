<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          ID #
        </th>
        <th scope="col" class="px-6 py-3">
          Category
        </th>
        <th scope="col" class="px-6 py-3">
          Status
        </th>
      </tr>
      </thead>
      <tbody v-for="item in dataTable">
      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ item.id }}
        </th>
        <td class="px-6 py-4">
          {{ item.workName }}
        </td>
        <td class="px-6 py-4">
          {{ item.status }}
        </td>
        <td class="px-6 py-4">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View detail</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>
<script setup>
const dataTable = [ {id: 1, workName: "plumetting", status: true},
                    {id: 2, workName: "plumetting", status: false},
                    {id: 3, workName: "plumetting", status: false}]
</script>

<style scoped>
</style>
