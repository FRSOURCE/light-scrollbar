# Default example

Example with default settings, `wrapperPlacement: 'inner'`

<script setup>
import DefaultExample from './default.vue'
</script>
<DefaultExample/>

Before mount
```html
<div class="my-scrollbar">
    ...content
</div>
```

After mount
```html
<div class="my-scrollbar light-scrollbar-wrapper-outside">
    <div class="light-scrollbar light-scrollbar-wrapper-inside">
        ...content
    </div>
</div>
```

