import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    staringDate: {
      type: Date,
      required: true,
      set: (value) => new Date(value),
    },
    degree: {
      type: String,
      required: true,
      enum: ["Bachelors", "Masters", "PhD"],
    },
    year: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: [1, "Semester must be at least 1est year 1est semester"],
      max: [10, "Semester cannot exceed 5th year 2nd semester"],
    },
    description: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
      min: [1, "Credits cannot be negative"],
      max: [10, "Credits cannot exceed 10"],
    },
    type: {
      type: String,
      required: true,
      enum: ["Core", "Lab", "Project"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Major", "Non-Major", "Elective"],
    },
    instructor: {
      name: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i.test(v);
          },
          message: (props) => `${props.value} is not a valid image URL!`,
        },
        required: [true, "Instructor image URL is required"],
      },
    },
    books: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            validate: {
              validator: function (v) {
                return v.every((url) =>
                  /^(https?:\/\/.*\.(?:pdf|epub|mobi))$/i.test(url)
                );
              },
              message: (props) => `One or more book URLs are invalid!`,
            },
            required: [true, "Book URL is required"],
          },
        },
      ],

      // required: [true, 'At least one book URL is required']
    },
    materials: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            validate: {
              validator: function (v) {
                return v.every((url) =>
                  /^(https?:\/\/.*\.(?:pdf|docx|pptx|xlsx|zip))$/i.test(url)
                );
              },
              message: (props) => `One or more material URLs are invalid!`,
            },
            required: [true, "Material URL is required"],
          },
        },
      ],

      // required: [true, 'At least one material URL is required']
    },
    tasks: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            validate: {
              validator: function (v) {
                return v.every((url) =>
                  /^(https?:\/\/.*\.(?:pdf|docx|pptx|xlsx|zip))$/i.test(url)
                );
              },
              message: (props) => `One or more tasks URLs are invalid!`,
            },
            required: [true, "Task URL is required"],
          },
        },
      ],

      // required: [true, 'At least one task is required']
    },
    assesments: {
      type: [
        {
          name: {
            type: String,
            required: true,
            enum: ["Midterm-1","Midterm-2","Termtest-1","Termtest-2","Quiz-1","Quiz-2", "Final", "Project"],
          },
          url: {
            type: String,
            validate: {
              validator: function (v) {
                return v.every((url) =>
                  /^(https?:\/\/.*\.(?:pdf|docx|pptx|xlsx|zip))$/i.test(url)
                );
              },
              message: (props) => `One or more assesment URLs are invalid!`,
            },
            required: [true, "Assesment URL is required"],
          },
        },
      ],

      // required: [true, 'At least one assesment is required']
    },
    handbook: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:pdf|epub|mobi))$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid handbook URL!`,
      },
      required: [true, "Handbook URL is required"],
    },
    
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
