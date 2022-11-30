# ShowOnHover example

Scrollbar can be visible only on hover, please hover onto list to show scrollbars

<script setup>
import DefaultExample from './default.vue';
import { ref, watch } from 'vue';
import { debounce } from 'lodash-es';

const showOnHoverTransition = ref(300);
const showOnHoverTransitionProp = ref(showOnHoverTransition.value);
const onUpdate = debounce((e) => {showOnHoverTransitionProp.value = showOnHoverTransition.value}, 200)
</script>
<hr/>
<input type="range" id="showOnHoverTransition" min="0" max="1500" v-model="showOnHoverTransition" @input="onUpdate"><br/>
<div>Transition duration {{showOnHoverTransition}}ms</div>
<hr/>

<DefaultExample :show-on-hover="parseInt(showOnHoverTransitionProp)"/>
