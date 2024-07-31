<template>
	<div class="container mx-auto p-4">
		<Tabs :tabs="tabs">
			<template #Launches>
				<div>
					<NuxtLoadingIndicator />
					<LaunchTable />
				</div>
			</template>
			<template #SavedLaunches>
				<SavedLaunches />
			</template>
		</Tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tabs from '../components/TabsComponent.vue';
import LaunchTable from '../components/LaunchTable.vue';
import SavedLaunches from '../components/SavedLaunches.vue';

export default defineComponent({
	components: {
		Tabs,
		LaunchTable,
		SavedLaunches
	},
	setup() {
		const tabs = [
			{ name: 'Launches', component: 'Launches' },
			{ name: 'Saved Launches', component: 'SavedLaunches' }
		];

		return {
			tabs
		};
	}
});
</script>
