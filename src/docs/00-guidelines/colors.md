---
status: "done"
---

<div class="documentation-page">
{% for palette, values in colors %}

<h3 class="design-tokens__heading">{{ palette }}</h3>

{% include "@color-palette" %}

{% endfor %}

</div>
