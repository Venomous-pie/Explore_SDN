import json

# Manual image mappings for Surigao del Norte places
# Replace the URLs below with your actual image links

image_mappings = {
    "Cloud 9 Surfing Area": [
        "https://i0.wp.com/backpackingwithabook.com/wp-content/uploads/2022/10/2-1.jpg?w=940&ssl=1",
        "https://i0.wp.com/backpackingwithabook.com/wp-content/uploads/2022/10/3.jpg?w=940&ssl=1",
        "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz-8Xjja7SyIN-xYgsR4MvMSAZPhMbFPoqGDJqArIsN32wPp9mMXDLUENzcUHZ6oZGc60b-SJii3JzwcCILDLZmglYjJjF5qOtrxo6m366vU1atRhTiD_4ncXUY4DWXkJyyOfEyLaFge5g=w675-h390-n-k-no",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Magpupungko Rock Pools": [
        "https://i0.wp.com/backpackingwithabook.com/wp-content/uploads/2022/02/Magpupungko-Pools-Pilar-Siargao.png?w=940&ssl=1",
        "https://thefroggyadventures.com/wp-content/uploads/2024/10/magpupungko-rock-pools-high-tide.jpg",
        "https://i.pinimg.com/736x/95/ea/74/95ea7485289aafc38c1ce0dda3e92e75.jpg",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    ],
    "Sohoton Cove National Park": [
        "https://www.weseektravel.com/wp-content/uploads/2021/11/Sohoton-Cove-National-Park-Siargao-1.jpg",
        "https://www.journeyera.com/wp-content/uploads/2018/01/sohoton-cove-national-park-socorro-01678.jpg",
        "https://farm5.staticflickr.com/4715/40369092792_8d041ccf85_c.jpg",
        "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80"
    ],
    "Siargao Island Hopping": [
        "https://thefroggyadventures.com/wp-content/uploads/2024/10/naked-island-siargao-view.jpg",
        "https://www.travel-palawan.com/wp-content/uploads/2024/01/Philippines-Guyam-Island-Siargao-Island-hopping-jpeg.jpeg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ14NEST1QRahoW7LbAEP12nBEnjncyVMRs1WeQSrHSS4yeMLUNXVlBiNEkIlQHyPLyOx4&usqp=CAU",
        "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80"
    ],
    "Bonok-Bonok Maradjaw Karadjaw Festival": [
        "https://businessmirror.com.ph/wp-content/uploads/2017/11/tourism02-110517.jpg",
        "https://allaboutfiesta.wordpress.com/wp-content/uploads/2016/09/hiyas-kalikasan.jpg",
        "https://www.rappler.com/tachyon/2024/09/bonok-bonok-04-scaled.jpg",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Maasin River": [
        "https://thefroggyadventures.com/wp-content/uploads/2024/10/maasin-river-siargao.jpg",
        "https://www.blisssiargao.com/wp-content/uploads/2023/10/The-Iconic-Bent-Palm-Tree-of-Siargao.jpg",
        "https://gttp.images.tshiftcdn.com/466852/x/0/maasin-river.jpg?crop=1.91%3A1&fit=crop&width=1200",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Mabua Pebble Beach": [
        "https://islandtrotters.com/assets/images/hendrix/2015/83-mabua.jpg",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJjUlpxhNxuRKhHPCcRdBvZlB8IoHRpO3-zRxjarrxdJz3Ej5LJDJFQuhujFZozz6RuF4N3PunLJEhKjIohVaXIyVWY_OWSuH_hpSzacmYrSxHEqCmPtG1ORzMzeSbnrDNcWawfMJm1KQ/s640/stone.jpg",
        "https://islandtrotters.com/assets/images/hendrix/2015/83-mabua-sunset.jpg",
        "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80"
    ],
    "Alegria Beach": [
        "https://www.sunchasingtravelers.com/wp-content/uploads/2020/09/alegria-beach-drone-view-1024x683.jpg",
        "https://www.journeyera.com/wp-content/uploads/2017/12/alegria-beach-siargao-02192-1.jpg",
        "https://www.blisssiargao.com/wp-content/uploads/2023/07/Alegria-Beach-Siargao-1030x775.jpg",
        "https://www.journeyera.com/wp-content/uploads/2019/01/alegria-beach-2-1024x682.jpg"
    ],
    "Pacifico Beach": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8pD1CR-2IZ5wcqu70kTszZfGQSNhQfxMUg&s",
        "https://thefroggyadventures.com/wp-content/uploads/2024/10/pacifico-beach-siargao.jpg",
        "https://www.jonnymelon.com/wp-content/uploads/2018/11/pacifico-siargao-4.jpg",
        "https://images.unsplash.com/photo-1459976829951-ba74a26e94f5?w=800&q=80"
    ],
    "Pasikon Beach": [
        "https://thefroggyadventures.com/wp-content/uploads/2024/12/pasikon-beach-siargao-feature.jpg",
        "https://thefroggyadventures.com/wp-content/uploads/2024/12/pasikon-beach-siargao-white-sand-cove.jpg",
        "https://girlonazebra.com/wp-content/uploads/2025/04/IMG_4653-1024x768.jpg",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Naked Island": [
        "https://gttp.images.tshiftcdn.com/386487/x/0/naked-island-siargao.jpg?crop=1.91%3A1&fit=crop&width=1200",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/a8/9f/9b/naked-island.jpg?w=1200&h=-1&s=1",
        "https://images.squarespace-cdn.com/content/v1/57265e5745bf21105b61fddb/1519134934498-DP2I3BAAJAO49LLCIRTP/P1020832.jpg",
        "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80"
    ],
    "Daku Island": [
        "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyTY7963BtQzsEx-Wr3JbG77moIxxov2_D13ziNh9dULFhXFQNjMJ7-M58tSSjxYJO-OJvtDCJhUdl_x3bYpPEaUrinVssfuB5BM4TtkSd_kIxXGHvjhxDjMS0FnmQLWxpzZz073T4ajlSH=w675-h390-n-k-no",
        "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRLK73-UbZjDcR_khpO3MBtJ6rvgMN2FpLUMtPrksziu32YdlHg2HFt1hbJU3S7lu7khh-HRQrryZ5_HLVADJh42mw&s=19",
        "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS5Fe3e8ih5-vwqKg2c0LtTZvxuAWHBlhx9hasdgnUUv-dXuqp6hgY41_TIAyLMxi-R93Oio7mb0eHf0j3hBDItSoA&s=19",
        "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80"
    ],
    "Guyam Island": [
        "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcR-SLfWVtKX9r01Js8GyOr451FpHAcFvK_Ii-piYwHGg8fnxiCylh5o4-K1kQeIB_eZCiU00ppWwoBh4SBXrJjMTN0&s=19",
        "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRvz_U4YZjwQpHaRsnHEcBMDYmOq28XrDEwbtknanBYF6EgwtzdZJdHSbxIj-Db-ukIvsNYWkSC5I12Dre4S3UsHcE&s=19",
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Sugba Lagoon": [
        "https://www.sunchasingtravelers.com/wp-content/uploads/2020/08/sugba-lagoon-siargao-boat-house.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/f/f4/SUGBA_LAGOON_%28MAY_2019%29.jpg",
        "https://www.jonnymelon.com/wp-content/uploads/2018/10/sugba-lagoon-15-e1539744206986.jpg",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
    ],
    "Kawhagan Island": [
        "https://cdn.prod.rexby.com/image/180727c7696d424783eabb00559001a7?format=webp&width=1080&height=1350",
        "https://www.projectlupad.com/wp-content/uploads/2019/06/Magnificent-Kawhagan-Island-in-Siargao-Aerial-View-Copyright-to-Project-LUPAD-8.jpg",
        "https://www.projectlupad.com/wp-content/uploads/2019/06/Magnificent-Kawhagan-Island-in-Siargao-Aerial-View-Copyright-to-Project-LUPAD-8.jpg",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Pamomoan Island": [
        "https://smallgirlbigbackpack.com/wp-content/uploads/2023/07/sugbalagoon-1026x650.jpg",
        "https://thefroggyadventures.com/wp-content/uploads/2025/04/pamomoan-beach-siargao-1080x720.jpg",
        "https://cdn.getyourguide.com/img/tour/13bb2a8832448e875ab3c48550930c155dbe51f625f26f2c36a78fcb870c544c.jpeg/148.jpg",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Tayangban Cave Pool": [
        "https://www.weseektravel.com/wp-content/uploads/2021/11/tayangban-cave-pool-siargao-1.jpg",
        "https://www.iwanderlista.com/wp-content/uploads/2020/04/Lugnason-Falls-7.jpg.webp",
        "https://titastravels.wordpress.com/wp-content/uploads/2021/10/tayangban-cave-pool-1-fb.jpg",
        "https://i.pinimg.com/736x/36/2f/ec/362fec0d7b16298fc0735947064779fa.jpg"
    ],
    "Hagukan Cave": [
        "https://i0.wp.com/leylander.net/wp-content/uploads/2021/01/LEY-Sohoton-Cove-cover.jpg?resize=700%2C445&ssl=1",
        "https://cbartazo.com/wp-content/uploads/2012/05/cave-ent.jpg",
        "https://farm5.staticflickr.com/4761/25541912857_bb3d0bd269_c.jpg",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
    ],
    "Magkukuob Cave": [
        "https://cdn.tripspoint.com/uploads/photos/14360/adventure-shared-tour_z6NQp.jpg",
        "https://mindtrip.ai/cdn-cgi/image/format=webp,w=720/https://iorigin.mindtrip.ai/attractions/128c/2e83/95f2/4ad3/5c4f/590d/c68a/b247",
        "https://mindtrip.ai/cdn-cgi/image/format=webp,w=720/https://iorigin.mindtrip.ai/attractions/128c/2e83/95f2/4ad3/5c4f/590d/c68a/b247",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
    ],
    "Taktak Falls": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaPVV4CIU56tLnnkxsTC08wZjAuGX9ptA6VQ&s",
        "https://themanduls.com/wp-content/uploads/2024/04/TakTak-waterfall-1.jpg",
        "https://www.weseektravel.com/wp-content/uploads/2021/11/taktak-falls-siargao-island-1-512x768.jpg",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
    ],
    "Tubig-Ajan Cold Spring": [
        "https://thefroggyadventures.com/wp-content/uploads/2024/10/Tubig-ajan-Cold-Spring-Siargao-1080x720.jpg",
        "https://thefroggyadventures.com/wp-content/uploads/2024/12/tubig-ajan-cold-spring-siargao.jpg",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Coconut Trees View Deck": [
        "https://thefroggyadventures.com/wp-content/uploads/2024/12/coconut-trees-deck-view.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Coconut_Trees_View_Deck_in_Siargao.jpg/2560px-Coconut_Trees_View_Deck_in_Siargao.jpg",
        "https://dailytravelpill.com/wp-content/uploads/2020/11/palm-tree-viewpoint-siargao.jpg",
        "https://media.safarway.com/content/5742ff90-62e5-4578-b19e-e5bbde435def_sm.jpg"
    ],
    "Coconut Road (Burgos)": [
        "https://smallgirlbigbackpack.com/wp-content/uploads/2023/08/coconutroad-1050x644.jpg",
        "https://static.wixstatic.com/media/4f04c0_e3fd3f35d60640bc83833d700d826c96~mv2.png/v1/fill/w_980,h_735,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/4f04c0_e3fd3f35d60640bc83833d700d826c96~mv2.png",
        "https://themanduls.com/wp-content/uploads/2024/03/coconut-road-siargao-drone.jpg",
        "https://www.weseektravel.com/wp-content/uploads/2021/11/palm-tree-road-siargao-1.jpg"
    ],
    "Catangnan-Cabitoonan Bridge": [
        "https://files01.pna.gov.ph/category-list/2021/06/25/19825496056174448616635878607566431819297758n.jpg",
        "https://www.blisssiargao.com/wp-content/uploads/2023/06/2023-01-17.jpg",
        "https://img.philkotse.com/2021/11/08/O3IWXvly/1-ddc6_wm.jpg",
        "https://pia.gov.ph/uploads/2021/11/8ea1df03da4545cd8a31b91a83042d71.jpg"
    ],
    "Canijugan Peak": [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/3a/0e/1d/the-view.jpg?w=800&h=500&s=1",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/3a/0e/1c/a-relaxing-massage-at.jpg?w=900&h=500&s=1",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/3a/0e/1b/massage-at-the-viewdeck.jpg?w=800&h=500&s=1",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Siargao Wake Park": [
        "https://static.wixstatic.com/media/ec917f_fbf1a402604a4987b6c451f29fab6e8e~mv2.jpg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ec917f_fbf1a402604a4987b6c451f29fab6e8e~mv2.jpg",
        "https://gttp.images.tshiftcdn.com/437903/x/0/try-the-lake-at-siargao-wakepark.jpg?quality=65&height=360&dpr=2",
        "https://www.blisssiargao.com/wp-content/uploads/2023/07/Success-at-Wakepark-Siarga-775x1030.jpg",
        "https://assets.simplotel.com/simplotel/image/upload/x_0,y_378,w_4032,h_2268,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/bravo-beach-resort-siargao/villas_in_Siargao,_rent_a_villa_in_Siargao,_houses_for_rent_in_Siargao,_Siargao_villas_IMG_5967?1761264000229"
    ],
    "Paddleboarding at Maasin River": [
        "https://thefroggyadventures.com/wp-content/uploads/2024/11/maasin-river-jumping-platform.jpg",
        "https://gttp.images.tshiftcdn.com/466852/x/0/maasin-river.jpg",
        "https://girlonazebra.com/wp-content/uploads/2025/04/IMG_4536-1024x768.jpg",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "Bayatakan Farm Experience": [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=800&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ],
    "General Luna Market": [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=800&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        "https://images.unsplash.com/photo-1473496169904-658ba7f44f30?w=800&q=80"
    ]
}

# Update places.json
with open('c:/Users/dedic/Surigao_Escapes/backend/data/places.json', 'r', encoding='utf-8') as f:
    places = json.load(f)

updated_count = 0
for place in places:
    place_name = place['name']
    if place_name in image_mappings:
        place['images'] = image_mappings[place_name]
        print(f"✓ Updated images for: {place_name}")
        updated_count += 1
    else:
        print(f"✗ No images found for: {place_name}")

with open('c:/Users/dedic/Surigao_Escapes/backend/data/places.json', 'w', encoding='utf-8') as f:
    json.dump(places, f, indent=2, ensure_ascii=False)

print(f"\n{'='*60}")
print(f"Updated {updated_count} out of {len(places)} places with images")
print(f"{'='*60}")
