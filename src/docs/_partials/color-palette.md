<div class="design-tokens">
{% for key, value in values %}
<div class="design-token">
    <div class="design-token__container">
      <div class="design-token__color" style="
      background-color: {{ value.hex }}">
    </div>
    </div>
    <div class="uk-width-expand">
    <div class="design-token__detail">
      <div class="design-token__name">{{ key }}</div>
      <div class="design-token__value">
        {{ value.hex }} <br>
        {{ value.rgb }} 
        </div>
    </div>
    </div>
</div>

{% endfor %}

</div>
