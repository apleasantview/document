---
title: 'Site index'
slug: 'site-index'
---

Every page, in one flat list — the directory, not the map. No order but the path, nothing left out. For the considered view of how it all fits.

<ul>
{%- for item in collections.all | sort(false, false, "url") -%}
	{%- if item.data.title and item.url != page.url %}
	<li><a href="{{ item.url }}">{{ item.data.title }}</a> <span class="label">{{ item.url }}</span></li>
	{%- endif -%}
{%- endfor %}
</ul>
