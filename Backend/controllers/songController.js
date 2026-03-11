import axios from "axios";

const getSongs = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.jamendo.com/v3.0/tracks/?client_id=4090bb1a&format=jsonpretty&limit=15`,
    );
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getPlaylistByTag = async (req, res) => {
  try {
    const tag = (req.params.tag || req.query.tag || "").toString().trim();
    // getting the tags from the params
    // or by quering the tag
    // convert everything into String and trim whitespace at the edges (starting and ending)

    if (!tag) {
      return res.status(400).json({ message: "Missing tag parameter" });
    }

    const limit = parseInt(req.query.limit ?? "10", 10) || 10;
    const clientId = "4090bb1a";
    const params = {
      client_id: clientId,
      format: "jsonpretty",
      tags: tag,
      limit,
    };

    const response = await axios.get("https://api.jamendo.com/v3.0/tracks/", {
      params,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "getPlaylistByTag error",
      error?.response?.data ?? error.message ?? error,
    );
    return res.status(500).json({ message: "Failed fetch by tags" });
  }
};

const toggleFavourite = async (req, res) => {
  const user = req.user;
  const song = req.body.song;

  if (!song || typeof song !== "object" || !song.id) {
    return res.status(400).json({ message: "Invalid song data" });
  }

  console.log(user.favourites);
  const exists = user.favourites.find((fav) => fav && fav.id === song.id);
  try {
    if (exists) {
      user.favourites = user.favourites.filter((fav) => fav.id !== song.id);
    } else {
      user.favourites.push(song);
    }

    await user.save();

    return res.status(200).json(user.favourites);
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ message: "Favourites not added, Something went wrong" });
    console.log("Toggle Favourites error:", error);
  }
};

export { getSongs, getPlaylistByTag, toggleFavourite };
