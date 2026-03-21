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
      lowercase: true,
    },
    department: {
      type: String,
      required: true,
      lowercase: true,
    },
    startingDate: {
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

    year: {
      type: Number,
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: [1, "Semester must be at least 1est year 1est semester"],
      max: [62, "Semester cannot exceed 6th year 2nd semester"],
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

    format: {
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
    // instructorImage: {
    //   imageURL: {
    //     type: String,
    //     required: [true, "Instructor image URL is required"],
    //     // Simplified validation: just check if it's a valid URL format
    //     validate: {
    //       validator: function (v) {
    //         return /^(https?:\/\/)/i.test(v);
    //       },
    //       message: "Invalid image URL format",
    //     },
    //   },
    //   publicId: {
    //     type: String,
    //     required: [true, "Public ID is required for image management"],
    //     select: false,
    //   },
    // },

    books: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          id: {
            type: Number,
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
                return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(v);
              },
              message: "The URL must be a valid PDF document link for books",
            },
          },
          // publicId: {
          //   type: String,
          //   required: [true, "Public ID is required for book management"],
          //   select: false,
          // },
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
          id: {
            type: Number,
            required: true,
          },
          fileUrl: {
            type: String,
            required: [true, "Material URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(v);
              },
              message:
                "The URL must be a valid PDF document link for materials",
            },
          },

          // publicId: {
          //   type: String,
          //   required: [true, "Public ID is required for material management"],
          //   select: false,
          // },
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
          id: {
            type: Number,
            required: true,
          },
          fileUrl: {
            type: String,
            required: [true, "Task URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(v);
              },
              message: "The URL must be a valid PDF document link for tasks",
            },
          },
          // publicId: {
          //   type: String,
          //   required: [true, "Public ID is required for task management"],
          //   select: false,
          // },
        },
      ],
      select: false,
      // required: [true, 'At least one task is required']
    },
    assessments: {
      type: [
        {
          type: {
            type: String,
            required: true,
            enum: [
              "Midterm-1",
              "Midterm-2",
              "Midterm-3",
              "Termtest-1",
              "Termtest-2",
              "Termtest-3",
              "Quiz-1",
              "Quiz-2",
              "Final",
              "Project",
            ],
          },
          id: {
            type: Number,
            required: true,
          },
          mark: {
            type: Number,
            required: true,
            min: [0, "Marks cannot be negative"],
            max: [100, "Marks cannot exceed 100"],
          },
          fileUrl: {
            type: String,
            required: [true, "Assessment URL is required"],
            validate: {
              validator: function (v) {
                // Use .test() for a single string
                return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(v);
              },
              message:
                "The URL must be a valid PDF document link for assessments",
            },
          },
          date: {
            type: Date,
            required: true,
            set: (value) => new Date(value),
          },
          // publicId: {
          //   type: String,
          //   required: [true, "Public ID is required for assesment management"],
          //   select: false,
          // },
        },
      ],
      select: false,
      // required: [true, 'At least one assesment is required']
    },
    handbook: {
      type: String,
      validate: {
        validator: function (v) {
          // Use .test() for a single string
          return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: "The URL must be a valid PDF document link for handbook",
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      select: false,
    },

    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "draft",
    },

    submittedAt: {
      type: Date,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },
    feedback: {
      type: String,
      trim: true,
    },
    isEditedSinceFeedback: {
      type: Boolean,
      default: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);

courseSchema.pre('save', function(next) {
  // 1. If the document is new, allow it to save (no lock yet)
  if (this.isNew) return next();

  // 2. Define the lock period (1 year in milliseconds)
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
  const currentTime = Date.now();
  
  // 3. Get the timestamp from when the course was first created
  const creationTime = new Date(this.createdAt).getTime();

  // 4. Compare current time vs creation time
  if (currentTime - creationTime > oneYearInMs) {
    const error = new Error("This course was created over 1 year ago and is now locked for editing.");
    return next(error);
  }

  next();
});

export default Course;
