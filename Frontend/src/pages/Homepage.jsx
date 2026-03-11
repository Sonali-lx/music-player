import React, { useEffect, useState } from "react";

import Footer from "../components/layout/Footer";
import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";

import "../css/pages/HomePage.css";
import { useSelector } from "react-redux";
import axios from "axios";
import useAudioPlayer from "../hooks/useAudioPlayer";
import EditProfile from "../components/auth/EditProfile";
import Modal from "../components/common/Modal";

const Homepage = () => {
  const [view, setView] = useState("home");
  const [songs, setSongs] = useState([]);
  const [searchSongs, setSearchSongs] = useState([]);
  const [onOpenEditProfile, setOnOpenEditProfile] = useState(false);
  const auth = useSelector((state) => state.auth);

  const songsToDisplay = view === "search" ? searchSongs : songs;

  const {
    audioRef,
    currentIndex,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    loopEnabled,
    shuffleEnabled,
    playbackSpeed,
    volume,
    playSongAtIndex,
    handleTogglePlay,
    handleNext,
    handlePrevious,
    handleTimeUpdate,
    handleLoadedMetaData,
    handleEnded,
    handleToggleMute,
    handleToggleLoop,
    handleToggleShuffle,
    handleChangeSpeed,
    handleSeek,
    handleChangeVolume,
  } = useAudioPlayer(songsToDisplay);

  const playerState = {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    isMuted,
    loopEnabled,
    shuffleEnabled,
    playbackSpeed,
    volume,
  };

  const playerControls = {
    playSongAtIndex,
    handleTogglePlay,
    handleNext,
    handlePrevious,
    handleSeek,
  };

  const playerFeatures = {
    onToggleMute: handleToggleMute,
    onToggleLoop: handleToggleLoop,
    onToggleShuffle: handleToggleShuffle,
    onChangeSpeed: handleChangeSpeed,
    onChangeVolume: handleChangeVolume,
  };

  useEffect(() => {
    const fetchInitialSongs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/songs`,
        );
        setSongs(res.data.results || []);
      } catch (error) {
        console.error("Error while fetching songs:", error);
        setSongs([]);
      }
    };
    fetchInitialSongs();
  }, []);

  // to display songs by playlist
  const loadPlaylist = async (tag) => {
    if (!tag) {
      console.warn("No tag is provided");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/songs/playlistByTag/${tag}`,
      );

      setSongs(res.data.results || []);
    } catch (error) {
      console.error("Failed to load playlist:", error);
      setSongs([]);
    }
  };

  // functionality when a user clicks a song in a table
  const handleSelectSong = (index) => {
    playSongAtIndex(index);
  };

  const handlePlayFavourite = (song) => {
    const favourites = auth.user?.favourites || [];
    if (!favourites.length) return;

    // const index = auth.user.favourites.findIndex((fav) => fav._id === song._id);
    const index = auth.user.favourites.findIndex((fav) => fav._id === song._id);
    // fav && -> needed, since, initially favourites can be null
    // findIndex is a function in JS
    setSongs(auth.user.favourites);
    setView("home");

    setTimeout(() => {
      if (index !== -1) {
        playSongAtIndex(index);
      }
    }, 0);
  };

  return (
    <div className="homepage-root">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetaData}
        onEnded={handleEnded}
      >
        {currentSong && <source src={currentSong.audio} type="audio/mpeg" />}
      </audio>
      <div className="homepage-main-wrapper">
        {/* Sidebar */}
        <div className="homepage-sidebar">
          <SideMenu
            setView={setView}
            view={view}
            onOpenEditProfile={() => setOnOpenEditProfile(true)}
          />
          {/*  written inside layout */}
        </div>
        {/* Main Content */}
        <div className="homepage-content">
          <MainArea
            view={view}
            currentIndex={currentIndex}
            onSelectSong={handleSelectSong}
            onSelectFavourite={handlePlayFavourite}
            onSelectTag={loadPlaylist}
            songsToDisplay={songsToDisplay}
            setSearchSongs={setSearchSongs}
          />
        </div>
      </div>
      {/* Footer Player */}
      <Footer
        playerState={playerState}
        playerControls={playerControls}
        playerFeatures={playerFeatures}
      />

      {onOpenEditProfile && (
        <Modal onClose={() => setOnOpenEditProfile(false)}>
          <EditProfile onClose={() => setOnOpenEditProfile(false)} />
        </Modal>
      )}
    </div>
  );
};

export default Homepage;
