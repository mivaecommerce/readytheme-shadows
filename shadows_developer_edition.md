#How to Upgrade to Shadows DE

### User Interface -> CSS/JavaScript Resources -> CSS Resources

**Remove:**
* core
* extensions
* themes
* stylesheet

**Add:**
* Code: `styles`
* Type: `LocalFile`
* File_Path: `themes/00000001/shadows/styles.min.css`
* Global: `Yes`
* Active: `Yes`
* Attributes:
    * `media` = `all`
    * `rel` = `stylesheet`
    * `type` = `text/css`
* Assign to the `css_list` Resource Group

* Code: `fallback`
* Type: `LocalFile`
* File_Path: `themes/00000001/shadows/styles-fallback.min.css`
* Global: `Yes`
* Active: `Yes`

### User Interface -> CSS/JavaScript Resources -> JavaScript Resources
**Remove:**
* core
* extensions
* themes
* scripts

**Add:**
* Code: `site-scripts`
* Type: `LocalFile`
* File_Path: `themes/00000001/shadows/scripts.min.js`
* Global: `Yes`
* Active: `Yes`
* Assign to the `footer_js` Resource Group

**Update `legacy-browser` JavaScript Resource with:**
```
<mvt:do name="l.success" file="g.Module_Feature_TUI_DB" value="Runtime_CSSResource_Load_Code('fallback', l.settings:cssresource)" />
<mvt:do name="l.success" file="g.Module_Feature_TUI_DB" value="Runtime_JavaScriptResource_Load_Code('polyfills', l.settings:scriptresource)" />
<mvt:if expr="l.settings:scriptresource:active EQ 1">
	if (!!window.MSInputMethodContext && !!document.documentMode) {
		document.write('<link type="text/css" media="all" rel="stylesheet" href="&mvt:cssresource:file;">');
		(function () {
			var polyfill = document.createElement('script');

			polyfill.type = 'text/javascript';
			polyfill.async = true;
			polyfill.src = '&mvte:scriptresource:file;';
			document.head.appendChild(polyfill);
		})();
	}
</mvt:if>
```
