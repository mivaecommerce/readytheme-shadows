# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

[2.00.05]: https://github.com/mivaecommerce/readytheme-shadows/compare/v2.00.04...v2.00.05
## [2.00.05] - 2021-02-09

#### Updated
This maintenance release addresses all issues contained in the v2.00.05 milestone.
- [Milestone v2.00.05](https://github.com/mivaecommerce/readytheme-shadows/milestone/9?closed=1)
  - **New Extension** [Show Password](https://github.com/mivaecommerce/Extensions/tree/master/show-password)
  - **New Feature** [Customer Quick Add Action](https://github.com/mivaecommerce/readytheme-shadows/issues/90)
  - **New Feature** [PROD: Update Product Weight Display on Attribute Change](https://github.com/mivaecommerce/readytheme-shadows/issues/89)
  - **Bug Fix** [OSEL: Shipping method radio buttons become misaligned on long shipping method names](https://github.com/mivaecommerce/readytheme-shadows/issues/88)

[2.00.04]: https://github.com/mivaecommerce/readytheme-shadows/compare/v2.0.0...v2.00.04
## [2.00.04] - 2020-12-18

#### Updated
This maintenance release addresses all issues contained in the v2.00.04 milestone.
- [Milestone v2.00.04](https://github.com/mivaecommerce/readytheme-shadows/milestone/8?closed=1)

[2.0.0]: https://github.com/mivaecommerce/readytheme-shadows/compare/v1.0.6...v2.0.0
## [2.0.0] - 2020-09-22

#### Upgraded
Shadows is now the default framework included with a Miva Merchant installation. Numerous changes and updates has been performed to make this happen. As such, v2.0.0 is not backwards compatible with v1.0.6 and there is no direct upgrade path. The best way to upgrade your site, is to create a development site within your administration portal and start from there.

[1.0.6]: https://github.com/mivaecommerce/readytheme-shadows/compare/v1.0.5.1...v1.0.6
## [1.0.6] - 2019-10-18

#### Fixed
This maintenance release addresses all issues contained in the v1.0.6 milestone.
- [Milestone v1.0.6](https://github.com/mivaecommerce/readytheme-shadows/milestone/7?closed=1)

[1.0.5.1]: https://github.com/mivaecommerce/readytheme-shadows/compare/v1.0.5...v1.0.5.1
## [1.0.5.1] - 2019-05-08

#### Fixed
This maintenance release addresses all issues contained in the v1.0.5.1 milestone.
- [Milestone v1.0.5.1](https://github.com/mivaecommerce/readytheme-shadows/milestone/6?closed=1)

[1.0.5]: https://github.com/mivaecommerce/readytheme-shadows/compare/v1.0.4...v1.0.5
## [1.0.5] - 2019-05-01
There have been a few housekeeping items taken care of in this update. Most notably, the addition of subdirectories for 
some of the extensions. This is to facilitate better organization and documentation for future extensions.

The extensions affected, at this time, are the breadcrumbs and navigation.
- The collapsing breadcrumbs extension has been moved to a subdirectory of breadcrumbs called collapsing.
- The drop-down, overflow, and overlay navigation extensions have been moved to their respective directories under navigation.

#### Added
- Support for the new [Customer Password Reset](https://docs.miva.com/how-to-guide/customer-password-reset) functionality introduced in 9.13.
- Support for the new [Combined Resource](https://docs.miva.com/how-to-guides/javascript-asset-management#combined-resources) and [Deferred JavaScript](https://docs.miva.com/how-to-guides/deferred-javascript) functionality introduced in 9.13.
	- You can use the [css_javascript+resources.xml](css_javascript_resources.xml) file to update your site to use this functionality.

#### Fixed
This maintenance release addresses all issues contained in the v1.0.5 milestone.
- [Milestone v1.0.5](https://github.com/mivaecommerce/readytheme-shadows/milestone/5?closed=1)

#### Removed
- Native CSS concatenation introduced in [v1.0.04 Issue #40](https://github.com/mivaecommerce/readytheme-shadows/issues/40). 

[1.0.4]: https://github.com/mivaecommerce/readytheme-shadows/compare/v1.0.3...v1.0.4
## [1.0.4] - 2019-01-09
#### Fixed
This maintenance release addresses all issues contained in the v1.0.4 milestone.
- [Milestone v1.0.4](https://github.com/mivaecommerce/readytheme-shadows/milestone/4?closed=1)

[1.0.3]: https://github.com/mivaecommerce/readytheme-shadows/compare/v1.0.2...v1.0.3
## [1.0.3] - 2018-09-07
#### Fixed
- Issue #29 - [Shadows ajax add to cart on PROD code fix](https://github.com/mivaecommerce/readytheme-shadows/issues/29)

#### Removed
- Due to popular demand, the product weight and count of products currently in the basket, on the product page, 
have been commented out of the code.

[1.0.2]: https://github.com/mivaecommerce/readytheme-shadows/compare/v1.0.1...v1.0.2
## [1.0.2] - 2018-09-06
#### Added
- [Contact Form](https://github.com/mivaecommerce/Extensions/tree/master/contact) Extension
- `align-content` and `align-self` classes to `core/css/objects/layout.css` for better item control.

#### Fixed
- Issue #28 - [Shadows Body Scroll iPhone Issue](https://github.com/mivaecommerce/readytheme-shadows/issues/28)
- Issue #27 - [Square Payment Fields](https://github.com/mivaecommerce/readytheme-shadows/issues/27)
- Issue #26 - [Problem with quantity input on BASK](https://github.com/mivaecommerce/readytheme-shadows/issues/26)
- Issue #25 - [Internet Explorer 11 lacks support for NodeList.forEach()](https://github.com/mivaecommerce/readytheme-shadows/issues/25)
- Issue #24 - [Off canvas sub navigation fix](https://github.com/mivaecommerce/readytheme-shadows/issues/24)
- Issue #23 - [Inactive categories showing up on catalog page](https://github.com/mivaecommerce/readytheme-shadows/issues/23)
- Issue #22 - [Inactivated hero image section but it stays](https://github.com/mivaecommerce/readytheme-shadows/issues/22)

[1.0.1]: https://github.com/mivaecommerce/readytheme-shadows/compare/v1.0.0...v1.0.1
## [1.0.1] - 2018-04-17
#### Added
- Updated for compatibility with Miva 9.9

#### Fixed
- Issue #20 - Roundabout had an issue with grouping.
- Mini-Basket updating multiple locations.
- Shipping estimator on BASK not returning all rates.
- Subscription details we not showing correctly on ORDS and INVC.
- Tab functionality on PROD.

#### Removed
- Unused `settings` directory for CSS.

#### Security
- Updated CACT to encode the return URLs. 

## 1.0.0 - 2017-12-22
#### Added
- `CHANGELOG.md` file
- `CODE_OF_CONDUCT.md` file
- `LICENSE` file
- `README.md` file
- Default `.htaccess` file
- Default `404.html` file
- Default `robots.txt` file
- Initial Framework `mm5/frameworks/00000001/shadows.pkg`
- Initial Theme Files `mm5/themes/shadows/*`
- Initial template export from Miva `editable_templates/shadows/mm5/*`
