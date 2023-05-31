export default {
  computed: {
    required: (value) => !!value || "Required.",
    min: (v) => v.length >= 8 || "Min 8 characters",
    emailMatch: () => `The email and password you entered don't match`,
  },
};
