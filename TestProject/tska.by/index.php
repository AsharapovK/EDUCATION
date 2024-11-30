<!-- Start Header -->
<header id="header" class="header_fullwidth">
	<div class="header_mid" data-height="100">
			<div class="header_mid_outer">
					<div class="header_mid_inner">
							<div class="logo_wrap" style="width: 270px; position: absolute;">
									<a href="/" title="{{ $settings['seo_title'] }}" class="logo">
											<img src="{{ $settings['siteLogo'] }}" alt="{{ $settings['seo_title'] }}" />
									</a>
							</div>
							<div class="resp_mid_nav_wrap">
									<div class="resp_mid_nav_outer">
											<a class="responsive_nav resp_mid_nav" href="javascript:void(0)">
													<span></span>
											</a>
									</div>
							</div>
							<div class="mid_search_but_wrap">
									<a href="javascript:void(0)" class="mid_search_but cmsmasters_header_search_but cmsmasters_theme_icon_search"></a>
							</div>
							<!-- Start Navigation -->
							<div class="mid_nav_wrap">
									<nav>
											<div class="menu-main-menu-container" style="display: flex; align-items: center;">
													<ul id="navigation" class="mid_nav navigation">
															@foreach ($menu as $item)
																	<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-7366 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-14162 menu-item-depth-0">
																			<a href="{{ $item['url'] }}">
																					<span class="nav_item_wrap">
																							<span class="nav_title" style="font-weight: 600 !important">{{ $item['name'] }}</span>
																					</span>
																			</a>
																			@if ($item['children'])
																					<ul class="sub-menu">
																							@foreach ($item['children'] as $sub_item)
																									<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-7366 current_page_item menu-item-14298 menu-item-depth-1">
																											<a href="{{ $sub_item['url'] }}">
																													<span class="nav_item_wrap">
																															<span class="nav_title" style="font-weight: 600 !important">{{ $sub_item['name'] }}</span>
																													</span>
																											</a>
																									</li>
																							@endforeach
																					</ul>
																			@endif
																	</li>
															@endforeach
													</ul>
													<!-- <div>
															<div id="google_translate_element" style="width: 150px;"></div>
													</div> -->
											</div>
									</nav>
							</div><!-- Finish Navigation -->
					</div>
			</div>
	</div>
</header>
<!-- Finish Header -->

<!--*** Google translate ***-->
<!-- <script type="text/javascript">
function googleTranslateElementInit() {
	new google.translate.TranslateElement({pageLanguage: 'ru', includedLanguages: 'be,de,en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}
</script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script> -->