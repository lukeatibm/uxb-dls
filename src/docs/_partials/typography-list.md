<table class="">
    <thead>
        <tr>
            <th>Element</th>
            <th>Size</th>
            <th>Spec</th>
        </tr>
    </thead>
    <tbody>
    {% for key, value in values %}
    <tr>
      <td><div><{{value.type}} style="font-size: {{ value.size }}px; line-height: 1; font-weight: {{ value.weight }}">{{ value.name }}</{{value.type}}></div></td> 
      <td><div><{{value.type}} style="font-size: {{ value.size }}px; line-height: 1; font-weight: {{ value.weight }}">{{ key }} | {{ value.size }}</{{value.type}}></div></td>
      <td>
      <dl>
          <dt>{{ value.name }}</dt>
          <dd>font-size: {{ value.size }}px<br />font-weight: {{ value.weight }}</dd>
      </dl>      
      </td>
    </tr>
    {% endfor %}
    </tbody>
</table>
