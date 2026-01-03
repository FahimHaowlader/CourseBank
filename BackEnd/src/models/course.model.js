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
    instructorImage: {
      imageURL: {
        type: String,
        required: [true, "Instructor image URL is required"],
        // Simplified validation: just check if it's a valid URL format
        validate: {
          validator: function (v) {
            return /^(https?:\/\/)/i.test(v);
          },
          message: "Invalid image URL format",
        },
      },
      publicId: {
        type: String,
        required: [true, "Public ID is required for image management"],
        select: false,
      },
    },

    books: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          authorName: {
            // Add this field
            type: String,
            required: [true, "Book author name is required"],
          },
          fileUrl: {
            type: String,
            required: [true, "Book URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/.*\.(?:pdf))$/i.test(v);
              },
              message:
                "The URL must be a valid PDF document link for books",
            },
          },
          publicId: {
            type: String,
            required: [true, "Public ID is required for book management"],
            select: false,
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
            required: [true, "Material URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/.*\.(?:pdf))$/i.test(v);
              },
              message:
                "The URL must be a valid PDF document link for materials",
            },
          },
          publicId: {
            type: String,
            required: [true, "Public ID is required for material management"],
            select: false,
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
            required: [true, "Task URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/.*\.(?:pdf))$/i.test(v);
              },
              message:
                "The URL must be a valid PDF document link for tasks",
            },
          },
          publicId: {
            type: String,
            required: [true, "Public ID is required for task management"],
            select: false,
          },
        },
      ],
      select: false,
      // required: [true, 'At least one task is required']
    },
    assessments: {
      type: [
        {
          name: {
            type: String,
            required: true,
            enum: [
              "Midterm-1",
              "Midterm-2",
              "Termtest-1",
              "Termtest-2",
              "Quiz-1",
              "Quiz-2",
              "Final",
              "Project",
            ],
          },
          fileUrl: {
            type: String,
            required: [true, "Assessment URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/.*\.(?:pdf))$/i.test(v);
              },
              message:
                "The URL must be a valid PDF document link for assessments",
            },
          },
          publicId: {
            type: String,
            required: [true, "Public ID is required for assesment management"],
            select: false,
          },
        },
      ],
      select: false,
      // required: [true, 'At least one assesment is required']
    },
    handbook: {
      fileUrl: {
        type: String,
        required: [true, "Handbook URL is required"],
        validate: {
          validator: function (v) {
            // Use .test() for a single string
            return /^(https?:\/\/.*\.(?:pdf))$/i.test(v);
          },
          message: "The URL must be a valid PDF document link for handbook",
        },
      },
      publicId: {
        type: String,
        required: [true, "Public ID is required for handbook management"],
        select: false,
      },
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
