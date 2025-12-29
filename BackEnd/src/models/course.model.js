import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
      lowercase: true,
    },
    staringDate: {
      type: Date,
      required: true,
      set: (value) => new Date(value),
    },
   degree: {
  type: String,
  required: true,
  lowercase: true,
  enum: ["bachelors", "masters", "phd"],
},

    // year: {
    //   type: Number,
    //   required: true,
    // },
    semester: {
      type: Number,
      required: true,
      min: [1, "Semester must be at least 1est year 1est semester"],
      max: [10, "Semester cannot exceed 5th year 2nd semester"],
    },
    description: {
      type: String,
      required: true,
       select: false,
    },
    credits: {
      type: Number,
      required: true,
      min: [1, "Credits cannot be negative"],
      max: [10, "Credits cannot exceed 10"],
    },
  
category: {
  type: String,
  required: true,
  lowercase: true,
  enum: ["major", "non-major", "elective"],
},

   type: {
  type: String,
  required: true,
  lowercase: true,
  enum: ["core", "lab", "project"],
},
    instructorName: {
        type: String,
        required: true,
        lowercase: true,
      },
    instructorDepartment: {
        type: String,
        required: true,
        lowercase: true,
         select: false,
      },
    imageUrl: {
        type: String,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i.test(v);
          },
          message: (props) => `${props.value} is not a valid image URL!`,
        },
        required: [true, "Instructor image URL is required"],
         select: false,
      },
  
    books: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          fileUrl: {
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
      select: false,
      // required: [true, 'At least one book URL is required']
    },
    materials: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          fileUrl: {
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
      select: false,

      // required: [true, 'At least one material URL is required']
    },
    tasks: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          fileUrl: {
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
       select: false,
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
          fileUrl: {
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
       select: false,
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
      select: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      select: false,
    },

  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
