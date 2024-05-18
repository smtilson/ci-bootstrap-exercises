from sqlalchemy import (
    create_engine,
    Column,
    Float,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db = create_engine("postgresql:///chinook")
base = declarative_base()


class Artist(base):
    __tablename__ = "Artist"
    ArtistId = Column(Integer, primary_key=True)
    Name = Column(String)


class Album(base):
    __tablename__ = "Album"
    AlbumId = Column(Integer, primary_key=True)
    Title = Column(String)
    ArtistId = Column(Integer, ForeignKey("Artist.ArtistId"))


class Track(base):
    __tablename__ = "Track"
    TrackId = Column(Integer, primary_key=True)
    Name = Column(String)
    AlbumId = Column(Integer, ForeignKey("Album.AlbumId"))
    MediaTypeId = Column(Integer, primary_key=False)
    GenreId = Column(Integer, primary_key=False)
    Composer = Column(String)
    Milliseconds = Column(Integer, primary_key=False)
    Bytes = Column(Integer, primary_key=False)
    UnitPrice = Column(Float)


Session = sessionmaker(db)
session = Session()

base.metadata.create_all(db)

# analog of queries in the orm style
artists = session.query(Artist)  # this is directly something we can iterate over
"""for artist in artists:
    print(artist.ArtistId, artist.Name, sep=' | ')
for artist in artists:
    print(artist.Name)"""
artist = session.query(Artist).filter_by(Name="Queen") #.first() to return the single artist and not the query object
#print(artist[0],artist.first())
#print(artist[0]==artist.first())
# magic_methods = [method for method in artist.__dir__() if method[0:2]=="__"]
# methods = [method for method in artist.__dir__() if method[0]!="_"]
artist1 = session.query(Artist).filter_by(ArtistId="51").first()
artist2 = session.query(Artist).filter_by(ArtistId=51).first()
print(artist1==artist2)

albums = session.query(Album).filter_by(ArtistId=51)
for album in albums:
    print(album.Title)
tracks = session.query(Track).filter_by(Composer="Queen")
print(tracks)
for track in tracks:
    print(track.Name)
