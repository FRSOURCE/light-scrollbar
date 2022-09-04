# wrapper outside example

Example with settings, `wrapperPlacement: 'outside'`

<script setup>
import wrapperOutside from './wrapperOutside.vue'
</script>
<wrapperOutside/>

Before mount
```html
<div class="my-scrollbar">
    ...content
</div>
```

After mount
```html
<div class="light-scrollbar-wrapper-outside">
    <div class="my-scrollbar light-scrollbar light-scrollbar-wrapper-inside">
        ...content
    </div>
</div>
```
