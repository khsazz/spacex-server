<template>
	<div>
		<div class="flex border-b border-gray-200 items-center justify-center">
			<button
				v-for="(tab, index) in tabs"
				:key="index"
				:class="[
					'px-4 py-2',
					selectedTab === index
						? 'border-b-2 border-blue-500 text-blue-500'
						: 'text-gray-600'
				]"
				@click="selectedTab = index"
			>
				{{ tab.name }}
			</button>
		</div>
		<div class="mt-4">
			<slot :name="tabs[selectedTab].component"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Tab {
	name: string;
	component: any;
}

export default defineComponent({
	name: 'TabComponent',
	props: {
		tabs: {
			type: Array as () => Tab[],
			required: true
		}
	},
	setup() {
		const selectedTab = ref(0);
		return {
			selectedTab
		};
	}
});
</script>

<style scoped>
button:focus {
	outline: none;
}
</style>
