package com.myorg;

public class SpringbootConstructProps {

    public static SpringbootConstructPropsBuilder builder() {
        return new SpringbootConstructPropsBuilder();
    }

    public static final class SpringbootConstructPropsBuilder {

        private SpringbootConstructPropsBuilder() {
        }

        public static SpringbootConstructPropsBuilder aSpringbootConstructProps() {
            return new SpringbootConstructPropsBuilder();
        }

        // public SpringbootConstructPropsBuilder withBucketCount(int bucketCount) {
        //     this.bucketCount = bucketCount;
        //     return this;
        // }

        public SpringbootConstructProps build() {
            SpringbootConstructProps SpringbootConstructProps = new SpringbootConstructProps();
            // SpringbootConstructProps.setBucketCount(bucketCount);
            return SpringbootConstructProps;
        }
    }

}


