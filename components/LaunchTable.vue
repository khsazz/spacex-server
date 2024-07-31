<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">SpaceX Launches</h1>
		<table class="min-w-full bg-white border border-gray-200">
			<thead>
				<tr>
					<th class="py-2 px-4 border-b text-left">Flight Number</th>
					<th class="py-2 px-4 border-b text-left">Name</th>
					<th class="py-2 px-4 border-b text-left">Date</th>
					<th class="py-2 px-4 border-b text-left"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in launches" :key="launch.flight_number">
					<td class="py-2 px-4 border-b">
						{{ launch.flight_number }}
					</td>
					<td class="py-2 px-4 border-b">{{ launch.name }}</td>
					<td class="py-2 px-4 border-b">
						{{ new Date(launch.date_utc).toLocaleDateString() }}
					</td>
					<td class="py-2 px-4 border-b">
						<button
							class="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
							@click="saveLaunch(launch)"
						>
							Save
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useLaunchesStore } from '~/store/launches';
import { storeToRefs } from 'pinia';

export default defineComponent({
	setup() {
		const store = useLaunchesStore();
		const { fetchLaunches, saveLaunch } = store;
		const { launches } = storeToRefs(store);

		onMounted(() => {
			fetchLaunches();
		});

		return {
			launches,
			saveLaunch
		};
	}
});
</script>
