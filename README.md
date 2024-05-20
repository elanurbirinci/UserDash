# Kullanıcı Yönetim Paneli

Bu proje, React kullanılarak oluşturulmuş bir Kullanıcı Yönetim Panelidir. Arayüz bileşenleri için Material-UI ve kullanıcı verilerini tablo formatında görüntülemek için react-data-table-component kullanılmıştır. Kullanıcı ekleme, düzenleme, silme ve filtreleme gibi işlevleri sağlar. Ayrıca, sayfalama görünümlerini ve rol tabanlı filtrelemeyi destekler.

## Kurulum

1.Depoyu klonlayın.
2.Proje dizinine gidin.
3.Bağımlılıkları yükleyin:

### 'npm install'

## Uygulamayı Çalıştırma
Uygulamayı başlatmak için şunu çalıştırın:

### 'npm start'

Bu, geliştirme sunucusunu başlatacak ve uygulamayı varsayılan web tarayıcınızda http://localhost:3000 adresinde açacaktır.


## Uygulama Özellikleri
Yeni Kullanıcı Ekleme: İsim, kullanıcı adı, e-posta, rol ve avatar seçimi gibi detayları olan yeni kullanıcıların eklenmesine olanak tanır.
Kullanıcıyı Düzenleme: Mevcut kullanıcı detaylarının düzenlenmesini sağlar.
Kullanıcıyı Silme: Tek tek veya çoklu olarak seçilen kullanıcıların silinmesini sağlar.
Kullanıcıları Filtreleme: İsim veya e-posta ile kullanıcıları filtrelemek için bir arama çubuğu içerir.
Rol Bazlı Filtreleme: All Users, Contributor, Author, Administrator ve Subscriber gibi rollerine göre filtrelenir.
Sayfalama: Büyük kullanıcı veri setlerini yönetmek için sayfalama desteği sağlar.
Özelleştirilebilir Avatarlar: Kullanıcılar önceden tanımlanmış bir avatar kümesinden seçim yapabilir.


## Kullanılan Teknolojiler
React: Kullanıcı arayüzleri oluşturmak için JavaScript kütüphanesi.
Material-UI: Hızlı ve kolay web geliştirme için React bileşenleri.
react-data-table-component: Verileri görüntülemek için basit ve özelleştirilebilir bir tablo bileşeni.
react-tabs: Sekmeli arayüzler oluşturmak için bir bileşen.
randomuser.me: Rastgele kullanıcı avatarları oluşturmak için kullanılmıştır.
