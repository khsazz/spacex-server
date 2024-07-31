<template>
	<div
		class="container w-full max-w-96 mx-auto overflow-auto h-96 border-1 border-solid pb-7 rounded-b-3xl drop-shadow-2xl bg-white"
	>
		<div
			v-for="launch in savedLaunches"
			:key="launch._id"
			class="p-3 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200"
		>
			<div class="flex items-center">
				<div class="ml-2 flex flex-col">
					<div class="leading-snug text-sm text-gray-900 font-bold">
						{{ launch.name }}
					</div>
					<div class="leading-snug text-xs text-gray-600">
						Flight Number: {{ launch.flight_number }}
					</div>
					<div class="leading-snug text-xs text-gray-600">
						Date:
						{{ new Date(launch.date_utc).toLocaleDateString() }}
					</div>
				</div>
			</div>
			<button
				class="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
				@click="deleteLaunch(launch._id as string)"
			>
				Delete
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useLaunchesStore } from '~/store/launches';
import { storeToRefs } from 'pinia';

export default defineComponent({
	setup() {
		const store = useLaunchesStore();
		const { fetchSavedLaunches, deleteLaunch } = store;
		const { savedLaunches } = storeToRefs(store);

		onMounted(() => {
			fetchSavedLaunches();
		});

		return {
			savedLaunches,
			deleteLaunch
		};
	}
});
</script>
